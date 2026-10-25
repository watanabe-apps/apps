#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate high-quality neural voice audio for all 100 words in Kotoba Zukan
using edge-tts (ja-JP-NanamiNeural) - identical to Gotou-Gobi app.
"""

import os
import json
import asyncio
import edge_tts

MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
AUDIO_WORDS_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/audio/words"
AUDIO_SYSTEM_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/audio/system"
VOICE = "ja-JP-NanamiNeural"

os.makedirs(AUDIO_WORDS_DIR, exist_ok=True)
os.makedirs(AUDIO_SYSTEM_DIR, exist_ok=True)

async def synthesize(sem, word_id, text, out_path):
    async with sem:
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            print(f"[SKIP] {word_id} ({text}) already exists.")
            return
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(text, VOICE)
                await comm.save(out_path)
                print(f"[OK] {word_id} ({text}) -> {os.path.basename(out_path)} ({os.path.getsize(out_path)} bytes)")
                return
            except Exception as e:
                print(f"[RETRY {attempt+1}] {word_id} error: {e}")
                await asyncio.sleep(1.0)
        print(f"[FAILED] {word_id} ({text})")

async def main():
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    sem = asyncio.Semaphore(10)
    tasks = []

    # 1. 100 Words
    for item in manifest:
        word_id = item['id']
        name = item['name']
        out_path = os.path.join(AUDIO_WORDS_DIR, f"{word_id}.mp3")
        tasks.append(synthesize(sem, word_id, name, out_path))

    # 2. System audio (Quiz clear fanfare text)
    tasks.append(synthesize(sem, "quiz_clear", "たいへんよくできました！", os.path.join(AUDIO_SYSTEM_DIR, "quiz_clear.mp3")))

    print(f"Starting neural voice generation for {len(tasks)} items...")
    await asyncio.gather(*tasks)
    print("All audio generation completed successfully!")

if __name__ == '__main__':
    asyncio.run(main())
