#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
batch_generate_hito.py - Generates all 33 'hito' (people) category illustrations
via Draw Things API (7860) and simultaneously deploys them to common/images/ and studio history.
"""

import os
import sys
import json
import time
import base64
import urllib.request
import urllib.error

BASE_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps"
CANDIDATES_DIR = os.path.join(BASE_DIR, "kotoba_zukan", "scripts", "candidates")
COMMON_IMAGES_DIR = os.path.join(BASE_DIR, "common", "images")
VOCAB_JS_PATH = os.path.join(BASE_DIR, "common", "vocab.js")
HISTORY_FILE = os.path.join(CANDIDATES_DIR, "history.json")
HISTORY_JS_FILE = os.path.join(CANDIDATES_DIR, "history.js")
DRAW_THINGS_API = "http://127.0.0.1:7860/sdapi/v1/txt2img"

os.makedirs(CANDIDATES_DIR, exist_ok=True)
os.makedirs(COMMON_IMAGES_DIR, exist_ok=True)

NEGATIVE_PROMPT = (
    "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, "
    "aged paper, parchment, dirty background, complex background, scenery, "
    "dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"
)

def load_vocab():
    with open(VOCAB_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    import re
    m = re.search(r'const VOCAB_LIST = (\[.*?\]);', content, re.DOTALL)
    if not m:
        return []
    json_str = re.sub(r',\s*\]', ']', m.group(1))
    return json.loads(json_str)

def add_to_history(entry):
    history = []
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                history = json.load(f)
        except Exception:
            history = []
    history = [h for h in history if h.get('url') != entry.get('url')]
    history.insert(0, entry)
    history = history[:80]
    try:
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
        with open(HISTORY_JS_FILE, 'w', encoding='utf-8') as f:
            f.write("window.DT_CACHED_HISTORY = " + json.dumps(history, ensure_ascii=False, indent=2) + ";\n")
    except Exception as e:
        print(f"Error saving history: {e}", file=sys.stderr)

def generate_one(word_item):
    word_id = word_item['id']
    name = word_item['name']
    prompt = word_item.get('prompt', '')
    if not prompt:
        prompt = (
            f"A realistic-leaning educational picture book illustration of {name}. "
            "Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, "
            "subtle clear contours. Completely isolated on a solid pure white background (#ffffff) with no ground clutter, "
            "no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. "
            "NOT a photograph, an illustration."
        )

    payload = {
        "prompt": prompt,
        "negative_prompt": NEGATIVE_PROMPT,
        "width": 1024,
        "height": 1024,
        "steps": 8,
        "cfg_scale": 1.0,
        "batch_size": 1
    }

    req = urllib.request.Request(
        DRAW_THINGS_API,
        data=json.dumps(payload).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )

    for attempt in range(2):
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                img_b64 = res_data['images'][0]
                img_bytes = base64.b64decode(img_b64)

                ts = int(time.time())
                # 1. Save to candidates
                cand_fname = f"studio_{word_id}_{ts}.png"
                cand_path = os.path.join(CANDIDATES_DIR, cand_fname)
                with open(cand_path, 'wb') as f:
                    f.write(img_bytes)

                # 2. Deploy directly to common/images/{word_id}.png
                prod_path = os.path.join(COMMON_IMAGES_DIR, f"{word_id}.png")
                with open(prod_path, 'wb') as f:
                    f.write(img_bytes)

                # 3. Add to persistent history & history.js
                add_to_history({
                    "url": f"/images/{cand_fname}",
                    "word_id": word_id,
                    "name": name,
                    "prompt": prompt,
                    "timestamp": ts * 1000
                })

                print(f"✅ [{word_id}] {name} 生成・配備完了 (1024x1024, {len(img_bytes)//1024}KB)")
                return True
        except Exception as e:
            print(f"⚠️ [{word_id}] {name} 試行 {attempt+1} 失敗: {e}", file=sys.stderr)
            time.sleep(2)

    return False

def main():
    items = load_vocab()
    hito_items = [it for it in items if it.get('category') == 'hito']
    total = len(hito_items)
    print(f"🚀 カテゴリー「ひと」全 {total} 件の自動生成・図鑑配備を開始します...")

    success_count = 0
    start_time = time.time()

    for idx, item in enumerate(hito_items, 1):
        print(f"\n--- [{idx}/{total}] {item['name']} ({item['id']}) ---")
        ok = generate_one(item)
        if ok:
            success_count += 1
        elapsed = int(time.time() - start_time)
        print(f"進捗: {success_count}/{idx} 成功 (経過: {elapsed//60}分{elapsed%60}秒)")

    total_time = int(time.time() - start_time)
    print(f"\n🎉 全 {total} 件中 {success_count} 件の生成が完了しました！(総所要時間: {total_time//60}分{total_time%60}秒)")

if __name__ == '__main__':
    main()
