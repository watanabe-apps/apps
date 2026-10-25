#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import base64
import time
import urllib.request
import os

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
OUT_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/scripts/candidates"
os.makedirs(OUT_DIR, exist_ok=True)

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text except on buttons, children vocabulary illustration"

BASE_NEG = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, rotary dial, vintage antique rotary phone, missing buttons, broken keypad, sloppy, distorted, mutated"

def gen(prompt, neg, filename, seed=1001):
    payload = {
        "prompt": prompt + STYLE_SUFFIX,
        "negative_prompt": BASE_NEG + ", " + neg,
        "width": 512,
        "height": 512,
        "steps": 25,
        "cfg_scale": 7.0,
        "seed": seed,
        "batch_size": 1
    }
    req = urllib.request.Request(API_URL, data=json.dumps(payload).encode('utf-8'), headers={"Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=180) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        img_bytes = base64.b64decode(res['images'][0])
        out_path = os.path.join(OUT_DIR, filename)
        with open(out_path, 'wb') as f:
            f.write(img_bytes)
        print(f"Generated {filename} in {time.time()-t0:.1f}s")

if __name__ == '__main__':
    # Candidate 1: Push-button office/home desk telephone with full keypad
    p1 = "a modern push-button desk telephone (現代のプッシュホン式固定電話), clean white body with a handset resting on cradle, a full neat grid of push buttons with number keys arranged in rows, small digital display screen, coiled cord"
    gen(p1, "rotary dial, few buttons, missing keys", "denwa_pushbutton_desk.png", seed=5001)

    # Candidate 2: Modern cordless phone with full 12-key numeric keypad
    p2 = "a modern Japanese cordless home phone handset on base charger (家庭用コードレス電話機・子機), clean white telephone handset featuring a complete neat grid of 12 push buttons (0 to 9 keys) on the front, small LCD screen at top, neat clear design"
    gen(p2, "missing buttons, only two buttons, sloppy keypad", "denwa_cordless_keypad.png", seed=6001)

