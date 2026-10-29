#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate remaining Priority A images for Kotoba Zukan using local Draw Things API
Target: 13 items (v_oru, d_batta, d_katatsumuri, t_edamame, t_kaki, m_reizouko, m_yakan,
                 m_manaita, m_handoso-pu, m_shanpu-, m_bandoeido, m_tsumiki, m_nawatobi)
"""

import os
import json
import base64
import time
import urllib.request
import urllib.error
import shutil

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
KZ_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/images"
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"

PRIORITY_A_IDS = [
    "v_oru", "d_batta", "d_katatsumuri", "t_edamame", "t_kaki",
    "m_reizouko", "m_yakan", "m_manaita", "m_handoso-pu", "m_shanpu-",
    "m_bandoeido", "m_tsumiki", "m_nawatobi"
]

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, suitable for children vocabulary flashcard, illustration"
NEGATIVE_PROMPT = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"

def is_api_running():
    try:
        req = urllib.request.Request("http://127.0.0.1:7860/sdapi/v1/options", method="GET")
        with urllib.request.urlopen(req, timeout=2) as resp:
            return resp.status == 200
    except Exception:
        return False

def generate(item):
    wid = item['id']
    name = item['name']
    prompt = item.get('prompt', '')
    full_prompt = f"{prompt}{STYLE_SUFFIX}"
    
    payload = {
        "prompt": full_prompt,
        "negative_prompt": NEGATIVE_PROMPT,
        "width": 512,
        "height": 512,
        "steps": 20,
        "cfg_scale": 7.0,
        "batch_size": 1
    }
    
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        API_URL,
        data=req_data,
        headers={"Content-Type": "application/json"}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            res_json = json.loads(resp.read().decode('utf-8'))
            img_b64 = res_json['images'][0]
            img_data = base64.b64decode(img_b64)
            
            kz_path = os.path.join(KZ_IMAGES_DIR, f"{wid}.png")
            common_path = os.path.join(COMMON_IMAGES_DIR, f"{wid}.png")
            
            with open(kz_path, 'wb') as f:
                f.write(img_data)
            shutil.copyfile(kz_path, common_path)
            
            print(f"[SUCCESS] Generated & Synchronized: {wid} ({name}) -> {len(img_data)} bytes")
            return True
    except Exception as e:
        print(f"[ERROR] Failed to generate {wid} ({name}): {e}")
        return False

def main():
    if not is_api_running():
        print("[STATUS] Draw Things API is not currently running at http://127.0.0.1:7860")
        print("Please start Draw Things and enable API Server in Settings.")
        return

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    item_map = {item['id']: item for item in manifest}
    target_items = [item_map[wid] for wid in PRIORITY_A_IDS if wid in item_map]
    
    print(f"Starting Priority A generation for {len(target_items)} items...")
    for idx, item in enumerate(target_items, 1):
        print(f"[{idx}/{len(target_items)}] Processing {item['id']} ({item['name']})...")
        generate(item)
        time.sleep(1.0)
    
    print("Priority A batch process finished!")

if __name__ == '__main__':
    main()
