#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Careful Image Generator for Kotoba Zukan with Handcrafted High-Precision Prompts.
Fixes all anatomical glitches, enforces strict pure white background (#ffffff),
avoids gibberish text, and ensures genuine picture-book illustration aesthetics.
"""

import os
import sys
import json
import time
import base64
import urllib.request
import urllib.error

# Ensure unbuffered output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(line_buffering=True)

API_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"
MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/images"
COMMON_IMAGES_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/common/images"
PROGRESS_FILE = "/tmp/careful_gen_progress.json"

STRICT_NEGATIVE = (
    "two heads, multiple heads, two tails, multiple tails, twin tails, split tail, "
    "extra legs, extra arms, extra limbs, missing legs, deformed paws, human hands on animal, "
    "standing upright, penguin pose, text, letters, words, writing, characters, font, logo, "
    "watermark, signature, dirty background, complex background, scenery, dark background, "
    "noisy, blurry, low quality, 3d render, photograph, realistic photo, frames, cut off"
)

# Handcrafted, defect-free prompts for all remaining items
CAREFUL_PROMPTS = {
    # Animals
    'd_yadokari': 'A realistic-leaning educational picture book illustration of a hermit crab emerging from a spiral seashell. Clean white cone shell, orange crab legs, two stalked black eyes, two antennae, front pincers. Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours. Isolated on solid pure white background (#ffffff), no sand.',
    'd_tsubame': 'A realistic-leaning educational picture book illustration of a barn swallow bird perched in profile. Glossy dark blue-black back and wings, reddish-chestnut chin, white belly, iconic deeply forked split tail streamers. Delicate watercolor and colored pencil contours, isolated on solid pure white background (#ffffff).',
    'd_tsuru': 'A realistic-leaning educational picture book illustration of a Japanese red-crowned crane standing gracefully in profile on two long black legs. Pure white plumage, black secondary feathers, red crown on top of head, straight sharp beak. Isolated on solid pure white background (#ffffff).',
    'd_otamajakushi': 'A realistic-leaning educational picture book illustration of a cute dark tadpole swimming cleanly. Round dark body with tiny eyes and a semi-translucent swimming tail fin. Completely isolated on solid pure white background (#ffffff), crystal clear, no murky water.',
    'd_hotaru': 'A realistic-leaning educational picture book illustration of a Japanese firefly. Black body with pink-orange pronotum, clear veined wings, soft warm glowing yellow-green bioluminescent tail light. Isolated on solid pure white background (#ffffff).',
    'd_batta': 'A realistic-leaning educational picture book illustration of a bright green grasshopper in side profile. Long bent hind jumping legs, slender antennae, large compound eye. Isolated on solid pure white background (#ffffff).',
    'd_aomushi': 'A realistic-leaning educational picture book illustration of a cute bright green caterpillar crawling. Segmented lime-green body, tiny stubby legs, friendly round face. Isolated on solid pure white background (#ffffff), no brown spots, no dirt.',
    'd_katatsumuri': 'A realistic-leaning educational picture book illustration of a garden snail in profile crawling cleanly. Smooth spiral brown shell, soft translucent body, two long upper tentacles with eye spots and two small lower tentacles. Isolated on solid pure white background (#ffffff), no slime trail.',
    'd_dangomushi': 'A realistic-leaning educational picture book illustration of two pill bugs: one crawling showing segmented dark slate-grey shell and antennae, and one curled into a tight smooth round ball beside it. Isolated on solid pure white background (#ffffff).',

    # Vehicles
    'n_torakku': 'A realistic-leaning educational picture book illustration of a Japanese flatbed cargo delivery truck. Clean blue cab, side mirrors, wheels, isolated on solid pure white background (#ffffff), zero text, no logo.',
    'n_kyanpinguka-': 'A realistic-leaning educational picture book illustration of a cute white recreational camper van camping car with pop-up roof and side window, isolated on solid pure white background (#ffffff), no scenery, no text.',
    'n_kamotsuressha': 'A realistic-leaning educational picture book illustration of a Japanese freight train electric locomotive pulling container cars on steel tracks, isolated on solid pure white background (#ffffff).',

    # Foods & Veggies
    't_satsumaimo': 'A realistic-leaning educational picture book illustration of a Japanese sweet potato, one whole potato with vibrant purple skin, one sliced in half showing steaming bright golden-yellow sweet flesh inside, isolated on solid pure white background (#ffffff).',
    't_kaki': 'A realistic-leaning educational picture book illustration of two glossy bright orange Japanese persimmon fruits, one whole with green leafy calyx cap, one cut in half showing sweet juicy translucent orange pulp, isolated on solid pure white background (#ffffff).',
    't_kuri': 'A realistic-leaning educational picture book illustration of Japanese sweet chestnuts, two glossy dark brown smooth chestnut nuts next to an open spiky burr husk, isolated on solid pure white background (#ffffff).',
    't_mango-': 'A realistic-leaning educational picture book illustration of a ripe tropical mango fruit, one whole with golden-orange-red blush skin, one half sliced in hedgehog criss-cross cubes, isolated on solid pure white background (#ffffff).',
    't_kiui': 'A realistic-leaning educational picture book illustration of fresh kiwi fruit, one whole brown fuzzy kiwi, one cross-section cut slice showing bright green flesh, tiny black seeds ring, and pale center, isolated on solid pure white background (#ffffff).',
    't_retasu': 'A realistic-leaning educational picture book illustration of a fresh round head of crisp green iceberg lettuce with layered ruffled pale green leaves, isolated on solid pure white background (#ffffff).',
    't_jagaimo': 'A realistic-leaning educational picture book illustration of three clean round golden-brown potatoes with natural shallow eyes, isolated on solid pure white background (#ffffff), no dirt, no mud.',
    't_kabocha': 'A realistic-leaning educational picture book illustration of a Japanese kabocha pumpkin squash, dark forest-green mottled skin, cut wedge showing rich deep golden-orange flesh with seeds, isolated on solid pure white background (#ffffff).',
    't_edamame': 'A realistic-leaning educational picture book illustration of fresh green edamame soybean pods, two curved green pods with visible round bean bumps and a few loose bright green boiled beans beside them, isolated on solid pure white background (#ffffff).',
    't_moyashi': 'A realistic-leaning educational picture book illustration of a fresh mound of crisp white bean sprouts with pale yellow seed heads and clean white stems, isolated on solid pure white background (#ffffff).',
    't_sandoicchi': 'A realistic-leaning educational picture book illustration of two neat triangle sandwich halves, soft crustless white bread filled with sliced ham, yellow cheese, green lettuce, and red tomato slices, clean cross-section, isolated on solid pure white background (#ffffff).',
    't_hanba-gu': 'A realistic-leaning educational picture book illustration of a Japanese Salisbury hamburger steak on a white plate, thick grilled patty glazed with rich brown demi-glace sauce, garnished with a carrot slice and broccoli, isolated on solid pure white background (#ffffff).',
    't_korokke': 'A realistic-leaning educational picture book illustration of Japanese panko croquettes, two golden-brown crispy breaded oval patties, one cut in half showing fluffy potato and minced meat filling with a thin drizzle of brown sauce, isolated on solid pure white background (#ffffff).',
    't_shuumai': 'A realistic-leaning educational picture book illustration of steamed pork shumai dumplings, three yellow dumpling wrappers filled with seasoned pork and topped with a single green pea, in a small dish, isolated on solid pure white background (#ffffff).',
    't_su-pu': 'A realistic-leaning educational picture book illustration of a warm ceramic bowl of creamy corn soup with croutons and chopped parsley on top, with a silver spoon, isolated on solid pure white background (#ffffff).',
    't_uinna-': 'A realistic-leaning educational picture book illustration of cooked Japanese mini wiener sausages, including one cute red octopus-cut sausage (tako wiener) standing up, isolated on solid pure white background (#ffffff).',
    't_potetochippusu': 'A realistic-leaning educational picture book illustration of crispy golden wavy potato chips piled neatly in a cluster, isolated on solid pure white background (#ffffff), no bag, no text.',

    # Objects & Playground
    'm_kaban': 'A realistic-leaning educational picture book illustration of a classic Japanese school tote bag handbag, navy blue canvas with sturdy brown leather handles, isolated on solid pure white background (#ffffff), no text.',
    'm_saifu': 'A realistic-leaning educational picture book illustration of a leather folding bifold wallet, closed, showing smooth warm brown leather texture, isolated on solid pure white background (#ffffff).',
    'm_mafura-': 'A realistic-leaning educational picture book illustration of a warm cozy knitted winter scarf, soft red plaid wool neatly folded, with fringe tassels, isolated on solid pure white background (#ffffff).',
    'm_udedokei': 'A realistic-leaning educational picture book illustration of a classic wristwatch with round white analog dial, black hands, numerals, and brown leather wrist strap, isolated on solid pure white background (#ffffff), zero text, no brand logo.',
    'm_moufu': 'A realistic-leaning educational picture book illustration of a soft fluffy fleece blanket neatly folded in a stack, gentle pastel color, isolated on solid pure white background (#ffffff).',
    'm_yakan': 'A realistic-leaning educational picture book illustration of a classic stainless steel stovetop tea kettle with black heat-resistant handle and spout, isolated on solid pure white background (#ffffff).',
    'm_manaita': 'A realistic-leaning educational picture book illustration of a clean rectangular wooden kitchen cutting board in perspective, smooth natural wood grain, isolated on solid pure white background (#ffffff).',
    'm_reizouko': 'A realistic-leaning educational picture book illustration of a clean modern white double-door home refrigerator, closed doors with sleek handles, isolated on solid pure white background (#ffffff), no brand name.',
    'm_sekken': 'A realistic-leaning educational picture book illustration of a clean bar of pastel bath soap on a small soap dish with tiny gentle bubbles, isolated on solid pure white background (#ffffff).',
    'm_handoso-pu': 'A realistic-leaning educational picture book illustration of a modern pump bottle of foaming hand soap, translucent bottle with white pump dispenser, isolated on solid pure white background (#ffffff), zero text, no brand label.',
    'm_shanpu-': 'A realistic-leaning educational picture book illustration of a pump dispenser bottle of hair shampoo, sleek clean design, isolated on solid pure white background (#ffffff), zero text, no brand label.',
    'm_basutaoru': 'A realistic-leaning educational picture book illustration of a neat stack of three fluffy folded bath towels in soft pastel colors, isolated on solid pure white background (#ffffff).',
    'm_tsumekiri': 'A realistic-leaning educational picture book illustration of a standard stainless steel lever nail clippers, closed, isolated on solid pure white background (#ffffff).',
    'm_bandoeido': 'A realistic-leaning educational picture book illustration of two adhesive bandages band-aids, one beige adhesive strip and one round spot bandage, with tiny air holes and pad in center, isolated on solid pure white background (#ffffff).',
    'm_tsumiki': 'A realistic-leaning educational picture book illustration of a set of colorful wooden building blocks arranged neatly (cubes, cylinders, triangle prisms in red, blue, yellow, green), isolated on solid pure white background (#ffffff).',
    'm_nawatobi': 'A realistic-leaning educational picture book illustration of a colorful children jump rope with plastic handles coiled neatly on ground, isolated on solid pure white background (#ffffff).',
    'm_shabondama': 'A realistic-leaning educational picture book illustration of colorful iridescent translucent soap bubbles floating in air with gentle rainbow reflections, with a yellow bubble wand blower, isolated on solid pure white background (#ffffff).',
    'm_suberidai': 'A realistic-leaning educational picture book illustration of a children playground slide with colorful steps and a smooth stainless steel sliding chute, isolated on solid pure white background (#ffffff), no background scenery.',
    'm_buranko': 'A realistic-leaning educational picture book illustration of a playground swing set with two rubber swings hanging from metal chains on a sturdy colorful steel frame, isolated on solid pure white background (#ffffff), no ground scenery.',

    # Verbs
    'v_nugu': 'A realistic-leaning educational picture book illustration of a cute preschool child taking off clothes. The child is pulling a cozy knit sweater up over their head, arms raised through the sleeves, upper body view, isolated on solid pure white background (#ffffff).',
    'v_osu': 'A realistic-leaning educational picture book illustration of a cute preschool child pressing a big bright red button on a clean panel with their index finger, smiling, side view, isolated on solid pure white background (#ffffff).',
    'v_te-o-furu': 'A realistic-leaning educational picture book illustration of a cheerful cute child smiling and waving one hand high goodbye in greeting, upper body, natural anatomy, isolated on solid pure white background (#ffffff).',
    'v_ugai': 'A realistic-leaning educational picture book illustration of a cute child gargling water with puffed cheeks, tilting head back slightly, holding a small plastic rinse cup, upper body, isolated on solid pure white background (#ffffff).',
    'v_kao-o-arau': 'A realistic-leaning educational picture book illustration of a cute child splashing clean fresh water on face with cupped hands, refreshing smile, upper body, isolated on solid pure white background (#ffffff).',
    'v_tsukuru': 'A realistic-leaning educational picture book illustration of a cute child sitting and building a tall tower out of colorful wooden blocks, happy smile, isolated on solid pure white background (#ffffff).',
    'v_mochiageru': 'A realistic-leaning educational picture book illustration of a cute child bending knees and lifting a cardboard box with both hands, isolated on solid pure white background (#ffffff).',
    'v_toru': 'A realistic-leaning educational picture book illustration of a child reaching forward and picking up a red apple from a low table, side view, isolated on solid pure white background (#ffffff).',
    'v_noboru': 'A realistic-leaning educational picture book illustration of a cute child climbing up wooden playground stairs or ladder, side view, isolated on solid pure white background (#ffffff).',
    'v_oriru': 'A realistic-leaning educational picture book illustration of a cute child stepping carefully down steps, holding a handrail, side view, isolated on solid pure white background (#ffffff).',
    'v_mitsukeru': 'A realistic-leaning educational picture book illustration of a curious child looking through a magnifying glass and smiling brightly with a eureka gesture, isolated on solid pure white background (#ffffff).',
    'v_nigeru': 'A realistic-leaning educational picture book illustration of a cute child in dynamic running pose running away excitedly, profile view, isolated on solid pure white background (#ffffff).',
    'v_pianowohiku': 'A realistic-leaning educational picture book illustration of a cute child sitting at an upright piano happily pressing the piano keys with both hands, isolated on solid pure white background (#ffffff).',
    'v_miru': 'A realistic-leaning educational picture book illustration of a cute child looking through toy binoculars with curious wide eyes, upper body, isolated on solid pure white background (#ffffff).',
    'v_oru': 'A realistic-leaning educational picture book illustration of two neat child hands carefully folding a square sheet of colorful origami paper on a clean surface, isolated on solid pure white background (#ffffff).'
}

def is_api_alive():
    try:
        with urllib.request.urlopen("http://127.0.0.1:7860/", timeout=5) as r:
            return r.status == 200
    except Exception:
        return False

def generate_image(prompt_text, width=512, height=512, steps=16):
    payload = {
        "prompt": prompt_text,
        "negative_prompt": STRICT_NEGATIVE,
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

def main():
    if not is_api_alive():
        print("ERROR: Draw Things is not reachable on port 7860")
        sys.exit(1)

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    manifest_map = {item['id']: item for item in manifest}

    total = len(CAREFUL_PROMPTS)
    print(f"Starting Careful Image Generator: {total} items queued.")

    completed = 0
    start_time = time.time()

    for word_id, prompt in CAREFUL_PROMPTS.items():
        completed += 1
        name = manifest_map.get(word_id, {}).get('name', word_id)
        cat = manifest_map.get(word_id, {}).get('categoryName', '')

        print(f"[{completed}/{total}] Generating: {name} ({word_id}) [{cat}]...")
        t0 = time.time()

        try:
            img_bytes = generate_image(prompt)

            # Write to kotoba_zukan/images/
            out_k = os.path.join(IMAGES_DIR, f"{word_id}.png")
            with open(out_k, 'wb') as f:
                f.write(img_bytes)

            # Mirror to common/images/
            out_c = os.path.join(COMMON_IMAGES_DIR, f"{word_id}.png")
            with open(out_c, 'wb') as f:
                f.write(img_bytes)

            # Update manifest prompt
            if word_id in manifest_map:
                manifest_map[word_id]['prompt'] = prompt
                manifest_map[word_id]['status'] = 'generated'

            with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
                json.dump(manifest, f, ensure_ascii=False, indent=2)

            elapsed = time.time() - t0
            rem_sec = (total - completed) * ((time.time() - start_time) / completed)
            print(f"  -> SUCCESS ({elapsed:.1f}s). Est remaining: {rem_sec/60:.1f} min")

            # Update status file
            with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
                json.dump({
                    'current': completed,
                    'total': total,
                    'last_item': word_id,
                    'last_name': name,
                    'est_remaining_min': round(rem_sec / 60, 1)
                }, f, ensure_ascii=False, indent=2)

            time.sleep(0.5)

        except KeyboardInterrupt:
            print("\nStopped by user.")
            break
        except Exception as e:
            print(f"  -> ERROR on {word_id}: {e}")
            time.sleep(2.0)

    print(f"Finished: generated {completed}/{total} in {(time.time() - start_time)/60:.1f} minutes.")

if __name__ == '__main__':
    main()

