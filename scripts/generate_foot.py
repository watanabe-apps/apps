#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Regenerate foot illustration with strictly five toes.
"""

import os
import json
import base64
import time
import random
import urllib.request

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"
KOTOBA_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/images"

STYLE_PREFIX = "A realistic-leaning educational picture book illustration of "
STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children educational vocabulary flashcard illustration"

STRONG_NEGATIVE = (
    "six toes, extra toes, multiple toes, seven toes, deformed toes, extra digit, polydactyly, "
    "duplicate toes, mutated toes, overlapping extra toes, missing toes, fewer than five toes, "
    "more than five toes, bad anatomy, deformed foot, disfigured, mutant, "
    "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, "
    "parchment, dirty background, complex background, scenery, dark background, noisy, "
    "messy, blurry, low quality, text, watermark, signature, borders, frames, cut off"
)

# 5本の指がはっきりとわかる足のプロンプト
PROMPT = (
    "a clean cute human foot seen from top angle, clearly showing EXACTLY five neat toes "
    "(one big toe, one second toe, one middle toe, one fourth toe, one little toe, exactly 5 toes), "
    "perfect normal human anatomy with five toes, clean neat toes and foot"
)

def generate_image(seed=None, width=512, height=512, steps=18):
    full_prompt = f"{STYLE_PREFIX}{PROMPT}{STYLE_SUFFIX}"
    payload = {
        "prompt": full_prompt,
        "negative_prompt": STRONG_NEGATIVE,
        "width": width,
        "height": height,
        "steps": steps,
        "cfg_scale": 7.5,
        "batch_size": 1
    }
    if seed is not None:
        payload["seed"] = seed
        
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(API_URL, data=req_data, headers={"Content-Type": "application/json"})
    
    with urllib.request.urlopen(req, timeout=300) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        images = res.get('images', [])
        if not images:
            raise RuntimeError("No image returned from Draw Things API")
        return base64.b64decode(images[0])

def main():
    seed = random.randint(100000, 9999999)
    print(f"Generating candidate foot image with seed {seed}...")
    t0 = time.time()
    img_bytes = generate_image(seed=seed)
    
    out_path = os.path.join(COMMON_IMAGES_DIR, "m_ashi_candidate.png")
    with open(out_path, 'wb') as f:
        f.write(img_bytes)
    print(f"Saved candidate to {out_path} in {time.time()-t0:.1f}s")

if __name__ == '__main__':
    main()

