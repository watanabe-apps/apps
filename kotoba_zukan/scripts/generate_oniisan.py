#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 'h_oniisan' (おにいさん):
- Bust shot (chest-up portrait), matching otousan/okaasan/oneesan.
- Age: around 12 years old (pre-teen, 6th grade / 7th grade).
- Warm, reliable, kind smiling expression.
- Pure white background, watercolor picture book style.
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

PROMPTS = [
    {
        "variant": "v1_bust_12yo",
        "prompt": "An educational Japanese picture book watercolor illustration of a kind and reliable elder brother (おにいさん / 12-year-old older brother). Bust portrait framing, chest-up shot, facing forward, matching the family portrait series (like oneesan and otousan). A cheerful, friendly 12-year-old Japanese pre-teen boy with a neat clean short haircut, kind sparkling eyes, and a warm, dependable smiling expression. Wearing a neat casual layered polo shirt or crewneck sweater. Gentle warm watercolor wash, delicate soft pencil contours, completely isolated on solid pure white background (#ffffff), no raised hands, flashcard quality, no text, no letters.",
        "negative_prompt": "full body, standing, legs, shoes, toddler, little kid, adult man, beard, raised hands, waving hand, realistic photo, background scenery, text, watermark"
    },
    {
        "variant": "v2_bust_gentle",
        "prompt": "Japanese picture book watercolor illustration depicting an older brother (おにいさん / elder brother, age 12). Chest-up portrait bust, facing front. A gentle, pleasant 12-year-old Japanese schoolboy with natural short dark hair, warm welcoming smile, reliable big-brother charm. Wearing a clean casual shirt. Soft watercolor textures, delicate pencil contour, solid pure white background (#ffffff), isolated, no text, no letters.",
        "negative_prompt": "full body, legs, hands waving, toddler, baby, 30-year-old man, dark background, photo, messy lines, text, watermark"
    }
]

def generate_variant(p_info):
    word_id = "h_oniisan"
    word_name = "おにいさん"
    prompt = p_info["prompt"]
    neg_prompt = p_info.get("negative_prompt", "")
    variant = p_info["variant"]

    print(f"\n🎨 Generating {word_name} ({variant})...")

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
        with urllib.request.urlopen(req, timeout=120) as response:
            result = json.loads(response.read().decode('utf-8'))
            images = result.get('images', [])
            if not images:
                print(f"❌ No image returned")
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
        print(f"❌ Error: {e}")
        return None

def main():
    os.makedirs(CANDIDATES_DIR, exist_ok=True)
    history = []
    if os.path.exists(HISTORY_JSON):
        try:
            with open(HISTORY_JSON, 'r', encoding='utf-8') as f:
                history = json.load(f)
        except Exception:
            history = []

    results = []
    for p in PROMPTS:
        res = generate_variant(p)
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

        print(f"\n🎉 Successfully added {len(results)} bust candidates for h_oniisan!")

if __name__ == '__main__':
    main()
