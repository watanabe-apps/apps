#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 'h_anata' (あなた) - Strict Separation:
- Foreground: ONLY the viewer's first-person hand pointing index finger forward at the person.
- Background: A friendly person standing with BOTH arms relaxed straight down at sides (NOT raising hands, NOT pointing).
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
DRAW_THINGS_API = "http://127.0.0.1:7860/sdapi/v1/txt2img"

PROMPTS = [
    {
        "variant": "v3_strict_arms_down",
        "prompt": "An educational Japanese picture book watercolor illustration of the word 'You' (あなた). First-person POV angle: a single viewer's hand enters from the bottom corner of the frame, pointing its index finger directly at a friendly person in front. In the background, a friendly smiling person stands facing forward with BOTH hands hanging straight down at their sides in a calm relaxed standing pose. The background person is NOT raising their hands and NOT gesturing at all. Only the viewer's foreground hand is pointing forward at 'You'. Gentle warm watercolor textures, soft pencil contours, solid pure white background (#ffffff), isolated, no text, no letters.",
        "negative_prompt": "background person pointing, background person raising hand, touching fingers, pointing at each other, mutual pointing, extra hands, deformed hand, multiple hands, photo, text, watermark"
    },
    {
        "variant": "v4_pov_pointing",
        "prompt": "Japanese picture book watercolor illustration representing 'You' (あなた). First-person perspective (POV): in the foreground, the viewer's right hand points an index finger forward at a happy smiling child standing across from them. The child in the background is standing with hands placed behind their back or resting naturally against their legs, smiling warmly. It is unmistakably clear that only the viewer's hand from the front is pointing at 'You' (あなた). Gentle warm Japanese picture book style, soft pencil lines, pure white background (#ffffff), no text, no watermark.",
        "negative_prompt": "child raising hand, child pointing, mutual pointing, two pointing hands, deformed fingers, extra fingers, messy anatomy, photo, text, watermark"
    }
]

def generate_variant(p_info):
    word_id = "h_anata"
    word_name = "あなた"
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

        print(f"\n🎉 Successfully added {len(results)} new candidates for h_anata!")

if __name__ == '__main__':
    main()
