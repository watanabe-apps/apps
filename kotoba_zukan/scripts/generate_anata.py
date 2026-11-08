#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 'h_anata' (あなた) with First-Person POV pointing hand indicating the person in front.
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
        "variant": "v1_child",
        "prompt": "An educational Japanese picture book watercolor illustration representing 'You' (あなた). First-person POV perspective: in the close foreground, a hand extends into the frame from the bottom, pointing an index finger forward directly at a friendly person in front. Standing in front of the viewer is a cheerful smiling child with kind eyes facing forward. The foreground pointing hand clearly belongs to the first-person viewer pointing at 'You' (あなた), while the person in the background has their own arms naturally at their sides. Gentle warm Japanese picture book watercolor style, soft colored pencil contour. Completely isolated on solid pure white background (#ffffff), no ground, no text, no letters, flashcard quality.",
        "negative_prompt": "third person view, extra hands, deformed fingers, extra fingers, pointing at self, confusing arms, photo, dark background, text, watermark"
    },
    {
        "variant": "v2_friend",
        "prompt": "A warm educational picture book watercolor illustration depicting the concept of 'You' (あなた). First-person view (POV): from the bottom edge of the image, the viewer's hand extends forward, pointing with an index finger at a friendly companion standing opposite. In the background, a cute friendly young person smiles happily at the viewer. Clear depth: the pointing hand is in the immediate foreground pointing outward at 'You', while the subject is standing further back. Gentle warm Japanese watercolor wash, soft pencil lines, pure solid white background (#ffffff), isolated, no text, no watermark.",
        "negative_prompt": "extra limbs, deformed hand, six fingers, pointing at own chest, multiple people, photo, text, letters, watermark"
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

        print(f"\n🎉 Successfully added {len(results)} candidates for h_anata!")

if __name__ == '__main__':
    main()
