#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch generation of Priority B Action Verbs (12 items) for Kotoba Zukan using Draw Things API:
Replaces old chibi vector style with warm picture-book watercolor children consistent with v_tatsu, v_suwaru, v_yomu.
"""

import os
import json
import base64
import time
import urllib.request
import urllib.error
import shutil

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
# KZ_IMAGES_DIR removed
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"
ARTIFACT_DIR = "/Users/watanabetatsuki/.gemini/antigravity/brain/a382f397-33b4-437b-a5d1-e53b23bcbce6"

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, suitable for children vocabulary flashcard, illustration"
NEGATIVE_PROMPT = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"

TARGETS = {
    "v_aruku": {
        "name": "あるく",
        "prompt": "An educational picture book watercolor illustration of a cheerful toddler boy walking forward happily with good posture (あるく). Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, matching character style with yellow shirt and blue shorts. Stepping forward with arms swinging naturally, cheerful friendly expression. Solid pure white background (#ffffff), completely isolated, no background, no text, flashcard quality."
    },
    "v_hashiru": {
        "name": "はしる",
        "prompt": "An educational picture book watercolor illustration of an energetic little child running forward joyfully (はしる). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Dynamic running motion with swinging arms and bent knees, smiling happily. Hand-drawn picture book illustration. Solid pure white background (#ffffff), completely isolated, no track, no background, no text, flashcard quality."
    },
    "v_tobu": {
        "name": "とぶ",
        "prompt": "An educational picture book watercolor illustration of a happy child jumping up high in the air with joyful laughter (とぶ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Jumping with arms raised up and knees slightly bent in the air, playful lively pose. Solid pure white background (#ffffff), completely isolated, no background, no text, flashcard quality."
    },
    "v_oyogu": {
        "name": "およぐ",
        "prompt": "An educational picture book watercolor illustration of a cheerful child swimming happily (およぐ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Wearing cute swimming cap and swimwear, kicking legs and splashing gentle fresh blue water ripples. Cheerful and safe swimming illustration. Solid pure white background (#ffffff), completely isolated, no pool tiles, no text, flashcard quality."
    },
    "v_taberu": {
        "name": "たべる",
        "prompt": "An educational picture book watercolor illustration of a happy young child eating delicious food happily (たべる). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Sitting politely holding a spoon bringing food to mouth with delight, small bowl on table. Solid pure white background (#ffffff), completely isolated, no messy dining room, no text, flashcard quality."
    },
    "v_nomu": {
        "name": "のむ",
        "prompt": "An educational picture book watercolor illustration of a cute toddler holding a cup with both hands drinking refreshing water (のむ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Drinking peacefully with two hands on a small friendly pastel cup, eyes happy and relaxed. Solid pure white background (#ffffff), completely isolated, no clutter, no text, flashcard quality."
    },
    "v_neru": {
        "name": "ねる",
        "prompt": "An educational picture book watercolor illustration of a sweet peaceful child fast asleep under a cozy blanket (ねる). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Resting peacefully with closed serene eyes on a soft pillow, tucked under a warm pastel blanket. Solid pure white background (#ffffff), completely isolated, no dark bedroom, no text, flashcard quality."
    },
    "v_okiru": {
        "name": "おきる",
        "prompt": "An educational picture book watercolor illustration of a cheerful child waking up in the morning stretching arms up happily (おきる). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Sitting up from bed, stretching arms above head with a refreshing morning smile. Solid pure white background (#ffffff), completely isolated, no background, no text, flashcard quality."
    },
    "v_arau": {
        "name": "あらう",
        "prompt": "An educational picture book watercolor illustration of a cute little child washing both hands carefully with fluffy white soap foam (あらう). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Rubbing hands together covered in fluffy bubbly white foam, cheerful and hygienic daily habit. Solid pure white background (#ffffff), completely isolated, no dirty sink, no text, flashcard quality."
    },
    "v_utau": {
        "name": "うたう",
        "prompt": "An educational picture book watercolor illustration of a joyful child singing happily with mouth open wide (うたう). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Singing happily with both hands expressing the melody, three tiny playful musical notes floating lightly in the air. Solid pure white background (#ffffff), completely isolated, no microphone, no stage, no text, flashcard quality."
    },
    "v_odoru": {
        "name": "おどる",
        "prompt": "An educational picture book watercolor illustration of a happy energetic child dancing joyfully to music (おどる). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Playful fun dancing pose with a big bright smile, lively and full of delight. Solid pure white background (#ffffff), completely isolated, no stage, no clutter, no text, flashcard quality."
    },
    "v_warau": {
        "name": "わらう",
        "prompt": "An educational picture book watercolor illustration of a cheerful child laughing with a big bright genuine smile (わらう). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Rosy cheeks, crinkled happy eyes, open smiling mouth expressing pure innocent joy. Solid pure white background (#ffffff), completely isolated, no clutter, no text, flashcard quality."
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

            # Save directly to common/images
            common_file = os.path.join(COMMON_IMAGES_DIR, f"{target_id}.png")
            with open(common_file, "wb") as f:
                f.write(img_bytes)

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

