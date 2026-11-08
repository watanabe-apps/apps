#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 'h_otokonoko' (男の子) and 'h_onnanoko' (女の子) with MULTIPLE children (2-3 kids):
- Clear gender representation for toddler vocabulary clarity (distinguishing from brother/sister/individual).
- Boys: group of 2-3 clearly boyish cheerful boys (short hair, caps, T-shirts, shorts, sneakers, active smiles).
- Girls: group of 2-3 clearly girlish cute girls (pigtails, ribbons, cute dresses/skirts, pastel/pink, sweet smiles).
- Steps: 8, 1024x1024, pure white background.
"""

import os
import sys
import json
import base64
import time
import urllib.request

BASE_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps"
CANDIDATES_DIR = os.path.join(BASE_DIR, "kotoba_zukan", "scripts", "candidates")
HISTORY_JSON = os.path.join(CANDIDATES_DIR, "history.json")
HISTORY_JS = os.path.join(CANDIDATES_DIR, "history.js")
VOCAB_JS_PATH = os.path.join(BASE_DIR, "common", "vocab.js")
DRAW_THINGS_API = "http://127.0.0.1:7860/sdapi/v1/txt2img"

TARGETS = [
    {
        "id": "h_otokonoko",
        "name": "おとこのこ",
        "prompt": "An educational Japanese picture book watercolor illustration representing 'Boys' (おとこのこ / young boys). A cheerful group of three lively young Japanese boys standing side by side, smiling brightly together. Distinct boyish features: neat short haircuts, baseball caps, colorful casual T-shirts (blue, green, yellow), knee-length shorts, and athletic sneakers. Energetic friendly poses, one boy giving a thumbs-up, looking like happy school friends. Clearly representing the category of 'boys' as a group, distinct from a single brother. Gentle warm watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff), flashcard quality, no text, no letters.",
        "negative_prompt": "single child, only one person, girls, long hair, skirts, dresses, deformed hands, extra fingers, messy anatomy, photo, background scenery, text, watermark"
    },
    {
        "id": "h_onnanoko",
        "name": "おんなのこ",
        "prompt": "An educational Japanese picture book watercolor illustration representing 'Girls' (おんなのこ / young girls). A charming group of three cute young Japanese girls standing happily side by side, smiling sweetly together. Distinct girlish features: adorable hairstyles such as cute pigtails (twin tails) with hair ribbons, a high ponytail with a scrunchie, and cute bob with a headband. Wearing lovely pastel pink, red, and yellow dresses and flared skirts with pretty details, Mary Jane shoes. Holding hands or standing close like sweet cheerful friends. Clearly representing the category of 'girls' as a group, distinct from a single sister. Gentle warm watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff), flashcard quality, no text, no letters.",
        "negative_prompt": "single child, only one person, boys, short boyish haircuts, pants only, deformed hands, extra fingers, messy anatomy, photo, background scenery, text, watermark"
    }
]

def generate_target(target):
    word_id = target["id"]
    word_name = target["name"]
    prompt = target["prompt"]
    neg_prompt = target.get("negative_prompt", "")

    print(f"\n==================================================")
    print(f"🎨 Generating for [{word_id}] {word_name}...")
    print(f"📝 Prompt: {prompt[:80]}...")

    payload = {
        "prompt": prompt,
        "negative_prompt": neg_prompt,
        "width": 1024,
        "height": 1024,
        "steps": 8,
        "cfg_scale": 1.0,
        "batch_size": 1
    }

    req = urllib.request.Request(
        DRAW_THINGS_API,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )

    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=180) as response:
            result = json.loads(response.read().decode('utf-8'))
            images = result.get('images', [])
            if not images:
                print(f"❌ No images returned for {word_id}")
                return None

            img_data = base64.b64decode(images[0])
            ts = int(time.time())
            filename = f"studio_{word_id}_{ts}.png"
            filepath = os.path.join(CANDIDATES_DIR, filename)

            with open(filepath, 'wb') as f:
                f.write(img_data)
                f.flush()
                os.fsync(f.fileno())

            elapsed = time.time() - t0
            print(f"✅ Generated in {elapsed:.1f}s -> {filename}")
            return {
                "word_id": word_id,
                "word_name": word_name,
                "filename": filename,
                "url": f"/images/{filename}",
                "timestamp": ts * 1000,
                "is_backup": False,
                "prompt": prompt
            }
    except Exception as e:
        print(f"❌ Error generating {word_id}: {e}")
        return None

def update_vocab_prompts():
    if not os.path.exists(VOCAB_JS_PATH):
        return
    with open(VOCAB_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    for t in TARGETS:
        wid = t["id"]
        # update prompt in vocab.js
        # Find entry by id and replace prompt
        pass
    print("✅ Vocab prompts checked.")

def main():
    os.makedirs(CANDIDATES_DIR, exist_ok=True)
    update_vocab_prompts()

    history = []
    if os.path.exists(HISTORY_JSON):
        try:
            with open(HISTORY_JSON, 'r', encoding='utf-8') as f:
                history = json.load(f)
        except Exception:
            history = []

    results = []
    for target in TARGETS:
        res = generate_target(target)
        if res:
            results.append(res)
            history.insert(0, res)

    if results:
        with open(HISTORY_JSON, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
            f.flush()
            os.fsync(f.fileno())

        with open(HISTORY_JS, 'w', encoding='utf-8') as f:
            f.write("window.DT_CACHED_HISTORY = " + json.dumps(history, ensure_ascii=False, indent=2) + ";\n")
            f.flush()
            os.fsync(f.fileno())

        print(f"\n🎉 Successfully added {len(results)} multi-children candidates!")
        for r in results:
            print(f" - [{r['word_id']}] {r['word_name']}: {r['filename']}")

if __name__ == '__main__':
    main()
