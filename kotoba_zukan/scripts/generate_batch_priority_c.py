#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch generation of Priority C fixes:
1. v_ugai (うがいする): Cute child tilting head up slightly with puffed cheeks gargling cleanly, holding small cup.
2. n_kuruma (くるま): Clean red passenger compact car, NO text on license plate, warm watercolor.
3. n_kamotsuressha (かもつれっしゃ): Freight train with locomotive pulling colorful containers, contained tracks, NO text.
4. m_shabondama (しゃぼんだま): Shimmering soap bubbles with blowing wand fully contained inside canvas.
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
NEGATIVE_PROMPT = "text, letters, words, Japanese characters, numbers, alphabet, license plate text, watermark, signature, photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, borders, frames"

TARGETS = {
    "v_ugai": {
        "name": "うがいする",
        "prompt": "An educational picture book watercolor illustration of a cute little child gargling water cleanly (うがいする). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Tilting head back slightly with puffed round cheeks, looking up playfully while holding a small blue plastic cup in one hand. Clean, cheerful, hygienic daily habit illustration. NO dripping water, NO spilling, hand-drawn picture book illustration. Solid pure white background (#ffffff), completely isolated, no bathroom sink, no text, flashcard quality."
    },
    "n_kuruma": {
        "name": "くるま",
        "prompt": "An educational picture book watercolor illustration of a cute compact red car (くるま). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Charming red hatchback family car, completely clean blank license plate with NO text, NO numbers, NO letters, NO Japanese writing. Cute friendly rounded vehicle design for toddlers. Solid pure white background (#ffffff), completely isolated, no road, no driver, no background, no text, flashcard quality."
    },
    "n_kamotsuressha": {
        "name": "かもつれっしゃ",
        "prompt": "An educational picture book watercolor illustration of a Japanese freight train (かもつれっしゃ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Blue electric locomotive pulling colorful freight containers (red, green, blue) on a short section of railway track, nicely contained within the frame. Clean front with NO gibberish text, NO letters, NO numbers. Solid pure white background (#ffffff), completely isolated, no landscape, no text, flashcard quality."
    },
    "m_shabondama": {
        "name": "しゃぼんだま",
        "prompt": "An educational picture book watercolor illustration of shimmering soap bubbles floating gently in the air (しゃぼんだま). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Several beautiful translucent pastel iridescent bubbles of various sizes with gentle rainbow reflections. A cute yellow bubble blowing wand fully contained inside the canvas without sticking out. Solid pure white background (#ffffff), completely isolated, no hands, no clutter, no text, flashcard quality."
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

