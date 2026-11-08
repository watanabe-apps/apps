#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate fixed candidates for the 7 words flagged by the user:
1. d_katatsumuri (かたつむり) - Fix: 2 eyes on tentacle tips only, no duplicate eyes on face
2. h_panyasan (パンやさん) - Fix: friendly baker with white toque hat, apron, basket of freshly baked bread, 5 fingers
3. h_untenshi (うんてんし) - Fix: train driver in cockpit with steering/controller handle & white gloves
4. h_ekiin (えきいんさん) - Fix: station attendant on platform waving green signal flag / polite bow
5. h_uchuuhikoushi (うちゅうひこうし) - Fix: cute astronaut with transparent visor, proper 5-finger waving hand
6. h_santakuro-su (サンタクロース) - Fix: jolly picture book Santa with fluffy beard, big toy sack over shoulder, proper hands
7. h_oni (おに) - Fix: traditional cute friendly Japanese Red Oni (赤鬼) with tiger pants and kanabou club
"""

import os
import sys
import json
import base64
import time
import urllib.request

BASE_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps"
CANDIDATES_DIR = os.path.join(BASE_DIR, "kotoba_zukan", "scripts", "candidates")
VOCAB_JS_PATH = os.path.join(BASE_DIR, "common", "vocab.js")
HISTORY_JSON = os.path.join(CANDIDATES_DIR, "history.json")
HISTORY_JS = os.path.join(CANDIDATES_DIR, "history.js")
DRAW_THINGS_API = "http://127.0.0.1:7860/sdapi/v1/txt2img"

TARGETS = [
    {
        "id": "d_katatsumuri",
        "name": "かたつむり",
        "prompt": "An educational picture book watercolor illustration of a cute friendly garden snail crawling sideways (かたつむり). Gentle warm Japanese picture book style with delicate watercolor wash and soft pencil contours. Cute spiral shell on its back. Exactly two upper tentacles with cute round friendly eyes at the very tips. The snail's face below has ONLY a cute smiling mouth and blushing pink cheeks, with absolutely NO extra eyes or duplicate eyes on the head. Anatomically charming and clear for children. Completely isolated on a solid pure white background (#ffffff), no ground, no scenery, no text, no watermark, flashcard quality.",
        "negative_prompt": "duplicate eyes, four eyes, multiple eyes, eyes on face, realistic slimy slug, deformed shell, text, letters, background scenery"
    },
    {
        "id": "h_panyasan",
        "name": "パンやさん",
        "prompt": "Japanese picture book watercolor illustration of a friendly cheerful Japanese baker (パンやさん / baker, boulanger) wearing a clean white baker's chef hat (toque blanche) and a tidy apron, happily holding a wooden tray filled with delicious golden baked breads (melon pan, croissant, baguette). Warm friendly smiling face, accurate five-fingered hands, warm gentle watercolor wash, soft pencil contour. Completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters, no watermark.",
        "negative_prompt": "extra fingers, deformed hands, missing fingers, realistic photo, dirty clothes, background scenery, text, watermark"
    },
    {
        "id": "h_untenshi",
        "name": "うんてんし",
        "prompt": "Japanese picture book watercolor illustration of a professional train driver (うんてんし / train driver, motorman) sitting in a train cab holding a train controller handle (mascon handle). Wearing a crisp dark navy railway driver uniform, peaked cap, and clean white gloves (白手袋). Confident friendly smile, looking ahead, trustworthy pose for toddlers. Gentle watercolor wash, soft pencil contour. Completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "negative_prompt": "extra limbs, deformed hands, messy lines, text, letters, watermark, blurry, station master standing"
    },
    {
        "id": "h_ekiin",
        "name": "えきいんさん",
        "prompt": "Japanese picture book watercolor illustration of a polite and friendly train station attendant (えきいんさん / railway station attendant) standing straight, wearing a neat navy-blue station uniform, peaked cap, and clean white gloves, holding a small round green departure signal flag (出発合図器) and smiling warmly to welcome passengers. Gentle warm Japanese picture book style, delicate watercolor wash, soft pencil contour. Completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "negative_prompt": "train driver in cab, sitting, extra fingers, messy clothing, text, letters, watermark, realistic photo"
    },
    {
        "id": "h_uchuuhikoushi",
        "name": "うちゅうひこうし",
        "prompt": "Japanese picture book watercolor illustration of a cute young astronaut (うちゅうひこうし / astronaut) in a clean white space suit, waving one hand happily with an anatomically correct five-fingered white astronaut glove (exactly 5 fingers: one thumb and four fingers, no extra digits). Clear transparent bubble helmet visor showing a bright happy smiling child face inside. Warm gentle watercolor wash, soft pencil contour. Completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "negative_prompt": "six fingers, extra fingers, 6 fingers, deformed hand, polydactyly, opaque visor, dark visor, scary face, photo, background scenery, stars, text, watermark"
    },
    {
        "id": "h_santakuro-su",
        "name": "サンタクロース",
        "prompt": "Japanese picture book watercolor illustration of a jolly, round, friendly Santa Claus (サンタクロース / Santa Claus) with a big fluffy white beard and mustache, twinkling smiling eyes, wearing a traditional bright red coat with fluffy white fleece trim, red pointed hat with white pom-pom, black belt with gold buckle, and warm white mittens, carrying a large overflowing gift sack of toys slung over his shoulder. Merry warm storybook holiday charm, delicate watercolor wash, soft pencil contour. Completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "negative_prompt": "creepy face, thin beard, deformed hands, scary eyes, black dishwashing gloves, photo, background scenery, text, watermark"
    },
    {
        "id": "h_oni",
        "name": "おに",
        "prompt": "Traditional Japanese picture book watercolor illustration of a cute and friendly Red Oni (あかおに / Japanese Red Ogre for children's storybook). Bright friendly coral-red skin, two small yellow horns on cute curly dark hair, big round smiling eyes (not scary at all, lovable and gentle expression for toddlers), wearing yellow tiger-striped shorts (トラのパンツ), holding a small cute studded club (金棒). Classic Japanese fairy tale folklore style (泣いた赤鬼・節分絵本風), warm watercolor wash, soft pencil contour. Completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "negative_prompt": "furry beige monster, scary demon, blood, ferocious fangs, grotesque, photo, Where the Wild Things Are, realistic ogre, text, watermark"
    }
]

def update_vocab_prompts():
    if not os.path.exists(VOCAB_JS_PATH):
        return
    with open(VOCAB_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False
    for t in TARGETS:
        tid = t["id"]
        new_prompt = t["prompt"]
        import re
        pattern = rf'(\"id\":\s*\"{tid}\"[\s\S]*?\"prompt\":\s*\")([^\"]*)(\")'
        if re.search(pattern, content):
            content = re.sub(pattern, rf'\g<1>{new_prompt}\g<3>', content)
            modified = True
            print(f"Updated prompt for {tid} in vocab.js")

    if modified:
        with open(VOCAB_JS_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Saved updated vocab.js")

def generate_targets():
    os.makedirs(CANDIDATES_DIR, exist_ok=True)
    results = []

    for t in TARGETS:
        word_id = t["id"]
        name = t["name"]
        prompt = t["prompt"]
        neg = t.get("negative_prompt", "")
        print(f"\n🎨 Generating {name} ({word_id})...")

        payload = {
            "prompt": prompt,
            "negative_prompt": neg,
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

        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                img_b64 = res_data['images'][0]
                img_bytes = base64.b64decode(img_b64)

                ts = int(time.time())
                filename = f"studio_{word_id}_{ts}.png"
                out_path = os.path.join(CANDIDATES_DIR, filename)

                with open(out_path, 'wb') as f:
                    f.write(img_bytes)
                    f.flush()
                    os.fsync(f.fileno())

                print(f"✅ Saved candidate: {filename} ({len(img_bytes)} bytes)")
                results.append({
                    "word_id": word_id,
                    "name": name,
                    "filename": filename,
                    "url": f"/images/{filename}",
                    "timestamp": ts * 1000,
                    "prompt": prompt
                })
        except Exception as e:
            print(f"❌ Error generating {word_id}: {e}")

    # Add to history
    if results:
        history = []
        if os.path.exists(HISTORY_JSON):
            try:
                with open(HISTORY_JSON, 'r', encoding='utf-8') as f:
                    history = json.load(f)
            except Exception:
                history = []

        # Prepend new candidates
        for r in reversed(results):
            entry = {
                "url": r["url"],
                "word_id": r["word_id"],
                "name": r["name"],
                "prompt": r["prompt"],
                "timestamp": r["timestamp"]
            }
            history = [h for h in history if h.get('url') != r['url']]
            history.insert(0, entry)

        with open(HISTORY_JSON, 'w', encoding='utf-8') as f:
            json.dump(history[:80], f, ensure_ascii=False, indent=2)

        with open(HISTORY_JS, 'w', encoding='utf-8') as f:
            f.write("window.DT_CACHED_HISTORY = " + json.dumps(history[:80], ensure_ascii=False, indent=2) + ";\n")

        print(f"\n🎉 Successfully added {len(results)} candidates to history.json and history.js!")

if __name__ == '__main__':
    update_vocab_prompts()
    generate_targets()
