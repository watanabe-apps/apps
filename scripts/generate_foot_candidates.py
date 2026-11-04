#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import json
import base64
import time
import random
import urllib.request

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"

STYLE_PREFIX = "A realistic-leaning educational picture book illustration of "
STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children educational vocabulary flashcard illustration"

STRONG_NEGATIVE = (
    "six toes, extra toes, multiple toes, seven toes, deformed toes, extra digit, polydactyly, "
    "duplicate toes, mutated toes, long monkey toes, frog toes, missing toes, fewer than five toes, "
    "more than five toes, bad anatomy, deformed foot, disfigured, mutant, "
    "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, "
    "parchment, dirty background, complex background, scenery, dark background, noisy, "
    "messy, blurry, low quality, text, watermark, signature, borders, frames, cut off"
)

PROMPTS = [
    # 候補1: 横顔・自然な斜め角度の子どもの可愛い素足
    ("cand1", "a cute young child's bare foot seen from a natural three-quarter side angle, showing clean smooth heel, ankle, and exactly five cute neat rounded toes, anatomically correct normal 5 toes"),
    # 候補2: 足の裏（土踏まずと5本の可愛い丸い指）
    ("cand2", "the sole of a cute healthy child's bare foot seen from underneath, showing the foot sole, heel, and exactly five neat rounded toes in a gentle row, cute baby-like foot sole, five toes"),
]

def generate_image(prompt_text, seed=None):
    full_prompt = f"{STYLE_PREFIX}{prompt_text}{STYLE_SUFFIX}"
    payload = {
        "prompt": full_prompt,
        "negative_prompt": STRONG_NEGATIVE,
        "width": 512,
        "height": 512,
        "steps": 18,
        "cfg_scale": 7.5,
        "batch_size": 1
    }
    if seed:
        payload["seed"] = seed
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(API_URL, data=req_data, headers={"Content-Type": "application/json"})
    
    with urllib.request.urlopen(req, timeout=300) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        images = res.get('images', [])
        return base64.b64decode(images[0])

def main():
    for name, p in PROMPTS:
        seed = random.randint(100000, 9999999)
        print(f"Generating {name} with seed {seed}...")
        img_bytes = generate_image(p, seed=seed)
        out_path = os.path.join(COMMON_IMAGES_DIR, f"m_ashi_{name}.png")
        with open(out_path, 'wb') as f:
            f.write(img_bytes)
        print(f"Saved {out_path}")

if __name__ == '__main__':
    main()
