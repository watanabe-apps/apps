#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch Image Generator for Kotoba Zukan via local Draw Things (FLUX.2 [klein] 4B 6-bit).
Generates watercolor educational illustrations sequentially with progress tracking,
automatic resumption, and prompt manifest synchronization.
"""

import os
import sys
import json
import time
import base64
import urllib.request
import urllib.error

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/images"

BASE_NEGATIVE = (
    "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, "
    "parchment, dirty background, complex background, scenery, dark background, noisy, "
    "messy, blurry, low quality, text, watermark, signature, borders, frames, cut off"
)

def is_api_alive():
    try:
        with urllib.request.urlopen("http://127.0.0.1:7860/", timeout=5) as r:
            return r.status == 200
    except Exception:
        return False

def generate_image(prompt_text, width=512, height=512, steps=20):
    payload = {
        "prompt": prompt_text,
        "negative_prompt": BASE_NEGATIVE,
        "width": width,
        "height": height,
        "steps": steps,
        "cfg_scale": 7.0,
        "batch_size": 1
    }
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(API_URL, data=req_data, headers={"Content-Type": "application/json"})
    
    with urllib.request.urlopen(req, timeout=300) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        images = res.get('images', [])
        if not images:
            raise RuntimeError("No image returned from Draw Things API")
        return base64.b64decode(images[0])

def run_batch(limit=None, target_category=None):
    if not is_api_alive():
        print("ERROR: Draw Things is not reachable at http://127.0.0.1:7860")
        print("Please start Draw Things and enable the API Server.")
        sys.exit(1)

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Filter items needing generation
    pending_items = []
    for item in manifest:
        if target_category and item['category'] != target_category:
            continue
        img_path = os.path.join(IMAGES_DIR, f"{item['id']}.png")
        if item.get('status') != 'generated' or not os.path.exists(img_path) or os.path.getsize(img_path) < 1000:
            pending_items.append(item)

    total_pending = len(pending_items)
    total_all = len(manifest)
    total_generated = total_all - total_pending

    print(f"==================================================")
    print(f" Kotoba Zukan - Draw Things Batch Generator")
    print(f" Total Vocab: {total_all} words")
    print(f" Already Generated: {total_generated} words")
    print(f" Remaining to Generate: {total_pending} words")
    if limit:
        print(f" Limit for this session: {limit} words")
    if target_category:
        print(f" Target category: {target_category}")
    print(f"==================================================\n")

    if total_pending == 0:
        print("All target images are already generated! Nothing to do.")
        return

    count = 0
    start_time = time.time()

    for item in pending_items:
        if limit and count >= limit:
            print(f"Reached batch limit of {limit} images.")
            break

        word_id = item['id']
        name = item['name']
        cat = item['categoryName']
        prompt = item['prompt']
        out_file = os.path.join(IMAGES_DIR, f"{word_id}.png")

        count += 1
        print(f"[{count}/{min(limit or total_pending, total_pending)}] Generating: {name} ({word_id}) [{cat}]...")
        t0 = time.time()

        try:
            img_bytes = generate_image(prompt)
            with open(out_file, 'wb') as img_f:
                img_f.write(img_bytes)

            # Update manifest
            item['status'] = 'generated'
            with open(MANIFEST_PATH, 'w', encoding='utf-8') as mf:
                json.dump(manifest, mf, ensure_ascii=False, indent=2)

            elapsed = time.time() - t0
            total_elapsed = time.time() - start_time
            avg_per_img = total_elapsed / count
            rem_count = min(limit or total_pending, total_pending) - count
            est_rem_sec = rem_count * avg_per_img

            print(f"  -> SUCCESS in {elapsed:.1f}s ({len(img_bytes):,} bytes). Est remaining: {est_rem_sec/60:.1f} min\n")
            time.sleep(0.5)

        except KeyboardInterrupt:
            print("\nBatch generation paused by user (Ctrl+C). Progress is saved.")
            break
        except Exception as e:
            print(f"  -> FAILED {word_id}: {e}\n")
            time.sleep(2.0)

    print(f"Finished session: generated {count} images in {(time.time()-start_time)/60:.1f} minutes.")

if __name__ == '__main__':
    limit_arg = None
    cat_arg = None
    args = sys.argv[1:]
    
    for i, a in enumerate(args):
        if a == '--limit' and i + 1 < len(args):
            limit_arg = int(args[i+1])
        elif a == '--category' and i + 1 < len(args):
            cat_arg = args[i+1]
        elif a.startswith('--limit='):
            limit_arg = int(a.split('=')[1])
        elif a.startswith('--category='):
            cat_arg = a.split('=')[1]

    run_batch(limit=limit_arg, target_category=cat_arg)
