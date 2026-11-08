#!/usr/bin/env python3
"""
dt_generate.py - Draw Things CLI generation tool for Chat & Automation.
Generates images via Draw Things API (7860), automatically logs to candidates & history.json
so that review.html / dt_studio.py instantly displays it in the studio history!
"""

import os
import sys
import json
import time
import base64
import shutil
import argparse
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

def load_vocab_items():
    if not os.path.exists(VOCAB_JS_PATH):
        return []
    try:
        with open(VOCAB_JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
        start = content.find("const VOCAB_LIST = [")
        if start == -1:
            return []
        array_start = content.find("[", start)
        depth = 0
        array_end = -1
        for i in range(array_start, len(content)):
            if content[i] == '[':
                depth += 1
            elif content[i] == ']':
                depth -= 1
                if depth == 0:
                    array_end = i + 1
                    break
        if array_end != -1:
            import re
            json_str = re.sub(r',\s*\]', ']', content[array_start:array_end])
            return json.loads(json_str)
    except Exception as e:
        print(f"Error loading vocab.js: {e}", file=sys.stderr)
    return []

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
    try:
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history[:60], f, ensure_ascii=False, indent=2)
        with open(HISTORY_JS_FILE, 'w', encoding='utf-8') as f:
            f.write("window.DT_CACHED_HISTORY = " + json.dumps(history[:60], ensure_ascii=False, indent=2) + ";\n")
    except Exception as e:
        print(f"Error saving history: {e}", file=sys.stderr)

def generate_image(word_query, custom_prompt=None, steps=8, apply_now=False):
    vocab = load_vocab_items()
    matched = None
    for item in vocab:
        if item.get('id') == word_query or item.get('name') == word_query:
            matched = item
            break

    if not matched:
        print(f"Error: Word '{word_query}' not found in vocab.js", file=sys.stderr)
        return False

    word_id = matched.get('id')
    word_name = matched.get('name')

    if custom_prompt:
        prompt = custom_prompt
    elif matched.get('prompt'):
        prompt = matched.get('prompt')
    else:
        prompt = f"Japanese picture book watercolor illustration of a cute {word_name} ({word_name} / {matched.get('tts_text', word_name)}), warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters."

    negative = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames"

    print(f"🎨 Generating image for: {word_name} ({word_id})")
    print(f"📝 Prompt: {prompt}")

    payload = {
        "prompt": prompt,
        "negative_prompt": negative,
        "width": 1024,
        "height": 1024,
        "steps": steps,
        "cfg_scale": 1.0,
        "batch_size": 1
    }

    try:
        req = urllib.request.Request(
            DRAW_THINGS_API,
            data=json.dumps(payload).encode('utf-8'),
            headers={"Content-Type": "application/json"}
        )
        start_time = time.time()
        print("⏳ Sending request to Draw Things (7860)...")
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img_b64 = data['images'][0]
            img_bytes = base64.b64decode(img_b64)
            elapsed = time.time() - start_time

            ts = int(time.time())
            filename = f"candidate_{word_id}_{ts}.png"
            candidate_path = os.path.join(CANDIDATES_DIR, filename)

            with open(candidate_path, 'wb') as f:
                f.write(img_bytes)

            img_url = f"/images/{filename}"
            print(f"✅ Generated in {elapsed:.1f}s -> {candidate_path}")

            # Register into studio history
            hist_entry = {
                "url": img_url,
                "word_id": word_id,
                "name": word_name,
                "prompt": prompt,
                "timestamp": int(time.time() * 1000)
            }
            add_to_history(hist_entry)

            # If apply requested, backup old and overwrite production
            if apply_now:
                prod_path = os.path.join(COMMON_IMAGES_DIR, f"{word_id}.png")
                if os.path.exists(prod_path):
                    backup_filename = f"backup_{word_id}_{ts}.png"
                    backup_path = os.path.join(CANDIDATES_DIR, backup_filename)
                    shutil.copy2(prod_path, backup_path)
                    print(f"📦 Backed up old production image to: {backup_filename}")
                    add_to_history({
                        "url": f"/images/{backup_filename}",
                        "word_id": word_id,
                        "name": f"{word_name} (旧画像)",
                        "is_backup": True,
                        "timestamp": int(time.time() * 1000) - 1
                    })
                shutil.copy2(candidate_path, prod_path)
                print(f"✨ Applied to production: {prod_path}")

            print(json.dumps({
                "success": True,
                "word_id": word_id,
                "word_name": word_name,
                "image_url": img_url,
                "local_path": candidate_path,
                "applied": apply_now
            }, ensure_ascii=False))
            return True

    except Exception as e:
        print(f"❌ Draw Things Generation Error: {e}", file=sys.stderr)
        return False

def main():
    parser = argparse.ArgumentParser(description="Generate image via Draw Things CLI")
    parser.add_argument("--word", required=True, help="Word ID (e.g. d_inu) or Word Name (e.g. いぬ)")
    parser.add_argument("--prompt", default=None, help="Custom prompt")
    parser.add_argument("--steps", type=int, default=8, help="Sampling steps (default: 8)")
    parser.add_argument("--apply", action="store_true", help="Directly apply to production with backup")

    args = parser.parse_args()
    success = generate_image(args.word, args.prompt, args.steps, args.apply)
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
