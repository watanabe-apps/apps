#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Draw Things Local Image Generator for Kotoba Zukan
Sends txt2img requests to local Draw Things API server at http://127.0.0.1:7860
"""

import sys
import os
import json
import base64
import time
import urllib.request
import urllib.error

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/images"

# Style prefix and suffix for consistent picture book illustrations
# Avoid 'warm' or 'vintage' to prevent AI yellowish tint (黄ばみ防止)
STYLE_PREFIX = "A realistic-leaning educational picture book illustration of "
STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, suitable for children vocabulary flashcard, illustration"
NEGATIVE_PROMPT = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"

def generate_image(prompt_text, width=512, height=512, steps=20):
    full_prompt = f"{prompt_text}{STYLE_SUFFIX}"
    payload = {
        "prompt": full_prompt,
        "negative_prompt": NEGATIVE_PROMPT,
        "width": width,
        "height": height,
        "steps": steps,
        "cfg_scale": 7.0,
        "batch_size": 1
    }
    
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        API_URL,
        data=req_data,
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req, timeout=180) as resp:
        res_data = json.loads(resp.read().decode('utf-8'))
        images = res_data.get('images', [])
        if not images:
            raise RuntimeError("Draw Things API returned no images in response")
        return base64.b64decode(images[0])

def generate_single_custom(word_id, custom_prompt):
    print(f"Generating custom image for '{word_id}'...")
    print(f"Prompt: {custom_prompt}")
    t0 = time.time()
    img_bytes = generate_image(custom_prompt)
    elapsed = time.time() - t0
    out_file = os.path.join(IMAGES_DIR, f"{word_id}.png")
    with open(out_file, 'wb') as f:
        f.write(img_bytes)
    print(f"Saved {out_file} in {elapsed:.1f}s ({len(img_bytes)} bytes)")

def test_connection():
    try:
        with urllib.request.urlopen("http://127.0.0.1:7860/", timeout=5) as resp:
            return True
    except Exception as e:
        print(f"Cannot connect to Draw Things API: {e}")
        return False

def main():
    if not test_connection():
        print("Draw Things is not reachable on 7860")
        sys.exit(1)
        
    cmd = sys.argv[1] if len(sys.argv) > 1 else "--help"
    
    if cmd == "--remake-melon":
        prompt = "a classic perfectly round green Japanese musk melon fruit with delicate white netting and a green T-shaped stem on top, fresh crisp light green (まるごとの丸いマスクメロン)"
        generate_single_custom("t_meron", prompt)
    elif cmd == "--remake-peach":
        prompt = "a classic whole fresh ripe Japanese white peach fruit (まるごとの桃), soft pink and ivory blush, gentle cleft curve, green leaf attached to small stem, plump and round fruit, NOT sliced, NOT cut in half, whole fruit"
        generate_single_custom("t_momo", prompt)
    elif cmd == "--remake-socks":
        prompt = "a simple neat pair of everyday children white cotton socks (普段履きのシンプルな子どもの白い靴下), clean white with a simple light blue line at the top cuff, plain and simple, not flashy, not overly striped, everyday school socks"
        generate_single_custom("m_kutsushita", prompt)
    elif cmd == "--remake-phone":
        prompt = "a modern white cordless telephone handset on a sleek charging dock (現代のすっきりした家庭用コードレス電話機・子機), clean white push-button telephone handset with small digital display screen, modern compact home phone for children vocabulary"
        generate_single_custom("m_denwa", prompt)
    elif cmd == "--remake-all-three":
        main_remake_three()
    else:
        print("Usage: python3 generate_drawthings.py [--remake-melon | --remake-peach | --remake-socks | --remake-all-three]")

def main_remake_three():
    tasks = [
        ("t_meron", "a classic perfectly round green Japanese musk melon fruit with fine white netting and a green T-shaped stem on top, fresh crisp light green, whole round melon (まるごとの丸いマスクメロン)"),
        ("t_momo", "a classic whole fresh ripe Japanese white peach fruit (まるごとの桃), soft fresh pink and cream blush, gentle cleft curve, green leaf attached to small stem, plump round fruit, whole uncut fruit"),
        ("m_kutsushita", "a simple neat pair of everyday children white crew socks (普段履きのシンプルな子どもの白い靴下), clean white with a subtle light blue cuff band, plain and simple everyday socks, NOT flashy, not overly striped")
    ]
    for word_id, prompt in tasks:
        generate_single_custom(word_id, prompt)
        time.sleep(1.0)
    print("Completed remake of all three images!")

if __name__ == "__main__":
    main()

