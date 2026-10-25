#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate modern telephone illustrations for Kotoba Zukan using Draw Things.
"""

import os
import json
import base64
import time
import urllib.request

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
OUTPUT_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/scripts/candidates"
os.makedirs(OUTPUT_DIR, exist_ok=True)

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"

BASE_NEGATIVE = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames, rotary dial, vintage, antique, retro phone, rotary phone, 1970s, cord, curled cord"

def gen(prompt, filename, seed=1001):
    payload = {
        "prompt": prompt + STYLE_SUFFIX,
        "negative_prompt": BASE_NEGATIVE,
        "width": 512,
        "height": 512,
        "steps": 20,
        "cfg_scale": 7.0,
        "seed": seed,
        "batch_size": 1
    }
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(API_URL, data=req_data, headers={"Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=180) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        img_bytes = base64.b64decode(res['images'][0])
        out_path = os.path.join(OUTPUT_DIR, filename)
        with open(out_path, 'wb') as f:
            f.write(img_bytes)
        print(f"Generated {filename} in {time.time()-t0:.1f}s")
        return out_path

if __name__ == '__main__':
    # Candidate 1: Modern smartphone showing call screen with green phone receiver icon
    p1 = "a modern telephone (現代の電話・スマートフォン), a clean sleek smartphone with a friendly incoming phone call screen displaying a green telephone receiver handset icon and call button, clean simple modern mobile phone for children vocabulary"
    gen(p1, "denwa_smartphone.png", seed=3001)

    # Candidate 2: Modern cordless home telephone / digital push-button telephone
    p2 = "a modern white cordless telephone handset on a sleek charging dock (現代のすっきりした家庭用コードレス電話機・子機), clean white push-button telephone handset with small digital display screen, modern compact home phone for children vocabulary"
    gen(p2, "denwa_cordless.png", seed=4001)
