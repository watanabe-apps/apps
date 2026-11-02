#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate targeted fixes for user feedback in Kotoba Zukan using Draw Things API:
1. m_bandoeido (ばんそうこう): Clear picture book band-aid with beige tape, white pad, dot perforations.
2. m_nawatobi (なわとび): Jump rope with distinct handles and a long, graceful sweeping loop.
3. m_shanpu- (しゃんぷー): Pump bottle with front label clearly showing child's head lathered in bubbles.
4. m_handoso-pu (はんどそーぷ): Foaming pump bottle with front label clearly showing hands with bubbles.
"""

import os
import json
import base64
import time
import urllib.request
import urllib.error
import shutil

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
KZ_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/images"
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"
ARTIFACT_DIR = "/Users/watanabetatsuki/.gemini/antigravity/brain/a382f397-33b4-437b-a5d1-e53b23bcbce6"

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, suitable for children vocabulary flashcard, illustration"
NEGATIVE_PROMPT = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"

TARGETS = {
    "m_bandoeido": {
        "name": "ばんそうこう",
        "prompt": "An educational picture book watercolor illustration of two cute adhesive bandage strips, band-aids (ばんそうこう). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Classic beige and flesh-toned flexible bandages with a clean white rectangular absorbent gauze pad in the center and tiny breathable dot perforations on the flexible wings. Friendly and recognizable for kindergarten children, one bandage is neatly laid flat and another is slightly angled with a bit of paper backing peeling off. NOT a medical photograph, NOT a messy gauze roll. Hand-drawn picture book illustration. Solid pure white background (#ffffff), completely isolated, no skin, no clutter, no text, flashcard quality."
    },
    "m_nawatobi": {
        "name": "なわとび",
        "prompt": "An educational picture book watercolor illustration of a children's long jump rope (なわとび). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Two colorful molded plastic handles (one blue, one red) placed apart, with a long flexible vinyl skipping rope hanging in a wide, spacious, graceful swinging U-shaped loop between them. Clearly showing the full length of a jump rope suitable for a child to skip with. NOT coiled up tight, NOT short, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no floor, no clutter, no text, flashcard quality."
    },
    "m_shanpu-": {
        "name": "しゃんぷー",
        "prompt": "An educational picture book watercolor illustration of a hair shampoo pump bottle (しゃんぷー). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. A friendly pastel-colored shampoo pump dispenser bottle. Crucially, on the front label sticker, there is a clear cute illustration icon of a smiling child washing their head with fluffy white shampoo lather bubbles on their hair (cute head with bubbles icon). A couple of airy soap bubbles floating nearby. Clearly recognizable as hair shampoo for young children. Hand-drawn picture book illustration. Solid pure white background (#ffffff), completely isolated, no bathroom, no text, flashcard quality."
    },
    "m_handoso-pu": {
        "name": "はんどそーぷ",
        "prompt": "An educational picture book watercolor illustration of a foaming hand soap dispenser bottle (はんどそーぷ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. A charming rounded pump bottle with a wide foaming nozzle that dispenses a small fluffy mound of white foam. Crucially, on the front label sticker, there is a clear cute illustration icon of two hands washing with fluffy soap bubbles (hands with bubbles icon). Clearly recognizable as hand soap for young children. Hand-drawn picture book illustration. Solid pure white background (#ffffff), completely isolated, no sink, no text, flashcard quality."
    }
}

def generate_one(target_id, data):
    name = data["name"]
    prompt = data["prompt"]
    full_prompt = f"{prompt}{STYLE_SUFFIX}"

    payload = {
        "prompt": full_prompt,
        "negative_prompt": NEGATIVE_PROMPT,
        "width": 512,
        "height": 512,
        "steps": 20,
        "cfg_scale": 4.5,
        "seed": -1,
        "batch_size": 1
    }

    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        API_URL,
        data=req_data,
        headers={"Content-Type": "application/json"}
    )

    print(f"Generating {target_id} ({name})...")
    start_t = time.time()
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            resp_body = resp.read()
            res_json = json.loads(resp_body)
            img_b64 = res_json["images"][0]
            img_bytes = base64.b64decode(img_b64)

            # 1. Save to kotoba_zukan/images
            kz_file = os.path.join(KZ_IMAGES_DIR, f"{target_id}.png")
            with open(kz_file, "wb") as f:
                f.write(img_bytes)

            # 2. Copy to common/images
            common_file = os.path.join(COMMON_IMAGES_DIR, f"{target_id}.png")
            shutil.copyfile(kz_file, common_file)

            # 3. Copy to artifact dir for preview
            artifact_file = os.path.join(ARTIFACT_DIR, f"{target_id}.png")
            shutil.copyfile(kz_file, artifact_file)

            elapsed = time.time() - start_t
            print(f"  [SUCCESS] {target_id} ({name}) saved in {elapsed:.1f}s ({len(img_bytes)} bytes)")
            return True
    except Exception as e:
        print(f"  [ERROR] {target_id} ({name}) failed: {e}")
        return False

def main():
    print(f"=== Starting Draw Things generation for {len(TARGETS)} items ===")
    results = {}
    for wid, data in TARGETS.items():
        ok = generate_one(wid, data)
        results[wid] = ok
        time.sleep(1)

    print("\n=== Generation Summary ===")
    for wid, ok in results.items():
        name = TARGETS[wid]["name"]
        print(f"  {wid} ({name}): {'OK' if ok else 'FAILED'}")

if __name__ == "__main__":
    main()

