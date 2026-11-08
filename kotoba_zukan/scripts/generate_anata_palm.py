#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 'h_anata' (あなた) - Polite Open-Palm Gesture:
- Foreground: First-person POV viewer's open hand, PALM UPWARD (手のひらを上に向けて丁寧に示す), fingers together, indicating the person.
- Background: A friendly smiling person standing naturally facing the viewer.
- Polite, educational, polite etiquette (no rude index finger pointing).
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
        "variant": "v5_open_palm_polite",
        "prompt": "An educational Japanese picture book watercolor illustration of the word 'You' (あなた). First-person POV perspective: in the foreground, the viewer's gentle open hand extends from the bottom of the frame with palm facing upward, fingers smoothly together in a polite, respectful guiding gesture (手のひらを上に向けて丁寧に相手を示すジェスチャー) gently presenting and indicating the friendly person in front. Standing opposite is a cheerful, smiling child with a warm friendly expression, arms naturally relaxed. Polite educational etiquette, open palm upward, absolutely NOT index finger pointing. Gentle warm watercolor wash, soft colored pencil contours, solid pure white background (#ffffff), isolated, no text, no letters.",
        "negative_prompt": "index finger pointing, poking, rude pointing, closed fist, gun gesture, deformed fingers, extra fingers, six fingers, background person gesturing, photo, text, watermark"
    },
    {
        "variant": "v6_open_hand_presenting",
        "prompt": "Japanese picture book watercolor illustration depicting 'You' (あなた). First-person point of view (POV): from the bottom foreground, a single open right hand with palm facing upward and relaxed straight fingers extends forward to politely present and indicate a kind, smiling companion standing in front. The companion in the background smiles happily at the viewer. Clear polite Japanese etiquette gesture (手のひらを差し伸べて相手を示す), warm storybook watercolor style, soft pencil lines, completely isolated on pure white background (#ffffff), no text, no watermark.",
        "negative_prompt": "index finger pointing, rude finger, pointing stick, extra hands, deformed hand, grasping, photo, dark background, text, watermark"
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

        print(f"\n🎉 Successfully added {len(results)} open-palm candidates for h_anata!")

if __name__ == '__main__':
    main()
