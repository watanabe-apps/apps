#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os
import json
import base64
import time
import urllib.request

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
OUTPUT_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/scripts/candidates"
os.makedirs(OUTPUT_DIR, exist_ok=True)

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"

BASE_NEGATIVE = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"

def gen(prompt, neg_extra, filename, seed=-1):
    payload = {
        "prompt": prompt + STYLE_SUFFIX,
        "negative_prompt": BASE_NEGATIVE + ", " + neg_extra,
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

if __name__ == "__main__":
    # Melon candidates
    melon_prompt = "a classic Japanese musk melon (マスクメロン / アールスメロン), perfectly round smooth spherical melon completely covered all over with uniform delicate white lace netting pattern, pale sage green skin, seamless smooth round sphere, authentic Japanese green muskmelon with a neat green T-shaped stem on top, whole uncut round fruit, unsegmented"
    melon_neg = "vertical ribs, vertical stripes, vertical lines, sutures, pumpkin ribs, grooves, segments, slices, segmented, ribbed melon, cantaloupe lobes, gourd lobes, yellow tint"
    
    print("Generating Melon Candidate 1...")
    gen(melon_prompt, melon_neg, "melon_cand1.png", seed=1001)
    
    print("Generating Peach Candidate 1...")
    peach_prompt = "a whole Japanese white peach fruit (日本の白桃), smooth velvety plump round peach, seamless unbroken skin with gentle natural pastel pink and creamy white gradient blush, very subtle shallow surface crease, intact unbroken smooth surface, small stem with a fresh green leaf, whole uncut fruit, solid round fruit"
    peach_neg = "crack, split, open cleft, cut, incision, slit, hole, cavity, fissure, broken skin, sliced, deformed suture, gaping opening, white inside, yellow tint"
    gen(peach_prompt, peach_neg, "peach_cand1.png", seed=2001)

