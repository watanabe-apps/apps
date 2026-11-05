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
# KZ_IMAGES_DIR removed
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"

PRIORITY_A_IDS = [
    "t_edamame", "t_kaki",
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

# Exact custom prompts optimized for Draw Things (Flux/SD) picture-book flashcards
CUSTOM_PROMPTS = {
    "t_edamame": "An educational picture book watercolor illustration of Japanese green edamame soybeans in pod (えだまめ). Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures. Fresh green fuzzy pods with 3 plump round soybeans nestled inside. Authentic Japanese edamame, NOT sweet peas. Completely isolated on a solid pure white background (#ffffff), no bowl, no shadow, no text, flashcard quality.",
    "t_kaki": "An educational picture book watercolor illustration of a single ripe Japanese persimmon fruit (かき). Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, gentle contour lines. A whole bright glossy orange persimmon with its characteristic green four-lobed calyx and short brown stem on top. Completely isolated on a solid pure white background (#ffffff), no other fruit, no slice, no plate, no shadow, no text, flashcard quality.",
    "m_reizouko": "An educational picture book watercolor illustration of a Japanese home refrigerator (れいぞうこ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Soft pastel light-blue or white clean refrigerator with upper fridge door and lower freezer drawer, charming and friendly design suitable for children picture book. NOT a realistic photograph, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no kitchen, no floor, no text, flashcard quality.",
    "m_yakan": "An educational picture book watercolor illustration of a cute kitchen kettle (やかん). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Charming kettle with spout, arched handle, and lid, painted in warm friendly yellow or red watercolor wash. NOT a realistic photograph, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no stove, no clutter, no text, flashcard quality.",
    "m_manaita": "An educational picture book watercolor illustration of a wooden cutting board (まないた). Gentle warm Japanese picture book style with delicate watercolor and soft wood grain pencil textures. A clean rectangular wooden cutting board with smooth rounded corners, warm natural wood tone. NOT a photograph, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no table, no food scraps, no knife, no text, flashcard quality.",
    "m_handoso-pu": "An educational picture book watercolor illustration of a foaming hand soap dispenser bottle (はんどそーぷ). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Friendly pastel pump bottle with a pump head dispensing a tiny cloud of white bubbly foam, cute clean design. NOT a realistic photograph, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no sink, no text, flashcard quality.",
    "m_shanpu-": "An educational picture book watercolor illustration of a shampoo pump bottle (しゃんぷー). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Friendly pastel pump bottle for hair shampoo, cute tear-drop droplet icon or soap bubble decoration on bottle, warm bathroom essential illustration. NOT a 3D render, NOT a photograph. Solid pure white background (#ffffff), completely isolated, no bathroom, no text, flashcard quality.",
    "m_bandoeido": "An educational picture book watercolor illustration of cute adhesive bandage strips (ばんどえいど). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Two cute flexible bandages with small colorful stars or pastel polka dot pattern, neat gauze pad in the center. NOT a realistic medical photo, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no skin, no clutter, no text, flashcard quality.",
    "m_tsumiki": "An educational picture book watercolor illustration of colorful wooden building blocks (つみき). Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures. A neat little set of wooden toy blocks (red cube, blue cylinder, yellow triangle roof) arranged playfully. Hand-painted wooden textures with soft contours. NOT a realistic photograph, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no floor shadow, no text, flashcard quality.",
    "m_nawatobi": "An educational picture book watercolor illustration of a children jump rope (なわとび). Gentle warm Japanese picture book style with delicate watercolor and clean pencil contours. Cute jump rope loosely looped in a neat oval, with colorful plastic handles (blue and red). NOT a photo, hand-drawn illustration. Solid pure white background (#ffffff), completely isolated, no floor, no text, flashcard quality."
}

def generate(wid, name):
    prompt = CUSTOM_PROMPTS.get(wid, '')
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
        with urllib.request.urlopen(req, timeout=180) as resp:
            res_json = json.loads(resp.read().decode('utf-8'))
            img_b64 = res_json['images'][0]
            img_data = base64.b64decode(img_b64)
            
            common_path = os.path.join(COMMON_IMAGES_DIR, f"{wid}.png")
            
            with open(common_path, 'wb') as f:
                f.write(img_data)
            
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
    
    name_map = {item['id']: item['name'] for item in manifest}
    
    print(f"Starting Priority A batch generation for {len(PRIORITY_A_IDS)} items...")
    success_count = 0
    for idx, wid in enumerate(PRIORITY_A_IDS, 1):
        name = name_map.get(wid, wid)
        print(f"[{idx}/{len(PRIORITY_A_IDS)}] Generating {wid} ({name})...")
        ok = generate(wid, name)
        if ok:
            success_count += 1
        time.sleep(1.0)
    
    print(f"Priority A batch process finished! Success: {success_count}/{len(PRIORITY_A_IDS)}")

if __name__ == '__main__':
    main()
