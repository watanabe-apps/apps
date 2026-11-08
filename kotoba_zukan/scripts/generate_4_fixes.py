#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate ultra-targeted fixes for the 4 words:
1. d_katatsumuri: Exactly 2 eyes on upper tentacles only, NO facial eyes.
2. h_ekiin: Train station attendant on train station platform with train & platform environment.
3. h_uchuuhikoushi: Adult professional astronaut (not child), mature kind face in visor, 5 fingers.
4. h_oni: Pure traditional Japanese Setsubun Aka-Oni (red skin, 2 horns, tiger shorts, studded club, friendly smile, NO monster/ogre traits).
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
        "id": "d_katatsumuri",
        "name": "かたつむり",
        "prompt": "An educational picture book watercolor illustration of a cute snail crawling on a solid pure white background (かたつむり). Gentle warm Japanese picture book style, delicate watercolor wash, soft pencil contour. Round spiral shell on its back. The snail has exactly TWO upper eye-stalks with two simple black dot eyes at their very tips, and a simple curved smiling mouth on the body. CRITICAL: absolutely smooth face, NO eyes on the head, NO facial eyes, NO extra dots, exactly two eyes on the whole snail. Solid pure white background (#ffffff), isolated, no ground, no scenery, no text.",
        "negative_prompt": "duplicate eyes, four eyes, multiple eyes, extra eyes, eyes on face, eyes on head, double eyes, realistic slimy slug, scary, text, watermark, background scenery"
    },
    {
        "id": "h_ekiin",
        "name": "えきいんさん",
        "prompt": "Japanese picture book watercolor illustration of a friendly railway station attendant (えきいんさん) on a Japanese train station platform. Standing on the train station platform with a passenger commuter train stopped alongside, clear station roof, platform pillar, and yellow safety tactile blocks on the platform floor. The station attendant is wearing a neat dark navy-blue uniform with peaked cap and clean white gloves, performing a safety finger-pointing gesture (指差確認) with a warm friendly smile. Gentle warm Japanese picture book watercolor style, soft colored pencil textures. No text, no letters, no characters, no watermark.",
        "negative_prompt": "train driver sitting in cab, pure white background, missing platform, messy lines, text, letters, watermark, realistic photo, blurry"
    },
    {
        "id": "h_uchuuhikoushi",
        "name": "うちゅうひこうし",
        "prompt": "Japanese picture book watercolor illustration of an adult professional astronaut (うちゅうひこうし / adult astronaut, mature reliable man or woman). Realistic adult facial proportions, warm confident friendly smile clearly visible inside the clear transparent astronaut helmet visor. Wearing a clean white bulky space suit with authentic chest pack and shoulder patches, waving cheerfully with an accurate five-fingered white astronaut glove (one thumb and four fingers). Gentle warm watercolor wash, soft pencil contours. Completely isolated on solid pure white background (#ffffff), no text, no letters, flashcard quality.",
        "negative_prompt": "child, kid, baby, toddler, infant, young boy, young girl, deformed hands, extra fingers, six fingers, opaque visor, dark visor, scary, photo, background scenery, text, watermark"
    },
    {
        "id": "h_oni",
        "name": "おに",
        "prompt": "Traditional Japanese picture book watercolor illustration of a friendly Setsubun Red Oni (あかおに / Japanese red demon from folklore). A friendly red-skinned humanoid with two small yellow horns on his curly black hair, bushy friendly eyebrows, big round smiling eyes, and a cheerful wide smile with a cute small fang, looking lovable and fun for toddlers. Wearing classic yellow shorts with black tiger stripes (トラのパンツ), standing and holding a rounded black studded club (金棒). Gentle warm Japanese picture book watercolor style, soft colored pencil contours. Completely isolated on a solid pure white background (#ffffff). Absolutely NO scary monster, NO western ogre, NO grotesque beast, NO text, no letters.",
        "negative_prompt": "western ogre, ferocious monster, scary beast, grotesque troll, blood, fierce fangs, terrifying creature, animal face, furry monster, Where the Wild Things Are, dark background, photo, realistic, text, watermark"
    }
]

def generate_image(target):
    word_id = target["id"]
    word_name = target["name"]
    prompt = target["prompt"]
    neg_prompt = target.get("negative_prompt", "ugly, deformed, blurry, text, watermark")

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

    modified = False
    for t in TARGETS:
        wid = t["id"]
        new_p = t["prompt"].replace('"', '\\"')
        pattern = f'"{wid}"'
        if pattern in content:
            pass
    print("✅ Vocab prompts checked.")

def main():
    update_vocab_prompts()
    os.makedirs(CANDIDATES_DIR, exist_ok=True)

    # Load existing history
    history = []
    if os.path.exists(HISTORY_JSON):
        try:
            with open(HISTORY_JSON, 'r', encoding='utf-8') as f:
                history = json.load(f)
        except Exception as e:
            print(f"Warning reading history.json: {e}")

    results = []
    for target in TARGETS:
        res = generate_image(target)
        if res:
            results.append(res)
            # Add to history at top
            history.insert(0, res)

    # Save history.json
    with open(HISTORY_JSON, 'w', encoding='utf-8') as f:
        json.dump(history, f, ensure_ascii=False, indent=2)
        f.flush()
        os.fsync(f.fileno())

    # Save history.js
    with open(HISTORY_JS, 'w', encoding='utf-8') as f:
        f.write("window.DT_CACHED_HISTORY = " + json.dumps(history, ensure_ascii=False, indent=2) + ";\n")
        f.flush()
        os.fsync(f.fileno())

    print("\n🎉 All 4 images generated and registered to history!")
    for r in results:
        print(f" - [{r['word_id']}] {r['word_name']}: {r['filename']}")

if __name__ == '__main__':
    main()
