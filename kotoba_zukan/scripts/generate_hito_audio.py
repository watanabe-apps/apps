#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate audio files for 'hito' (people) category in Kotoba Zukan using edge-tts (ja-JP-NanamiNeural).
"""

import os
import json
import asyncio
import edge_tts

VOICE = "ja-JP-NanamiNeural"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "audio", "words")
MANIFEST_PATH = os.path.join(BASE_DIR, "prompts_manifest.json")

os.makedirs(AUDIO_DIR, exist_ok=True)

HITO_WORDS = [
    ("h_watashi", "わたし"),
    ("h_anata", "あなた"),
    ("h_otousan", "おとうさん"),
    ("h_okaasan", "おかあさん"),
    ("h_akachan", "あかちゃん"),
    ("h_oniisan", "おにいさん"),
    ("h_oneesan", "おねえさん"),
    ("h_otouto", "おとうと"),
    ("h_imouto", "いもうと"),
    ("h_ojiisan", "おじいさん"),
    ("h_obaasan", "おばあさん"),
    ("h_tomodachi", "ともだち"),
    ("h_otokonoko", "おとこのこ"),
    ("h_onnanoko", "おんなのこ"),
    ("h_sensei", "せんせい"),
    ("h_shouboushi", "しょうぼうし"),
    ("h_keisatsukan", "けいさつかん"),
    ("h_oishasan", "おいしゃさん"),
    ("h_kangoshi", "かんごし"),
    ("h_haishasan", "はいしゃさん"),
    ("h_kokkusan", "コックさん"),
    ("h_panyasan", "パンやさん"),
    ("h_hanayasan", "はなやさん"),
    ("h_ekiin", "えきいんさん"),
    ("h_untenshi", "うんてんし"),
    ("h_uchuuhikoushi", "うちゅうひこうし"),
    ("h_santakuro-su", "サンタクロース"),
    ("h_ohimesama", "おひめさま"),
    ("h_oujisama", "おうじさま"),
    ("h_mahoutsukai", "まほうつかい"),
    ("h_hi-ro-", "ヒーロー"),
    ("h_oni", "おに"),
    ("h_ninja", "にんじゃ")
]

async def synthesize(sem, word_id, text, out_path):
    async with sem:
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(text, VOICE)
                await comm.save(out_path)
                size = os.path.getsize(out_path)
                print(f"[OK] {word_id} ({text}) -> {os.path.basename(out_path)} ({size} bytes)")
                return
            except Exception as e:
                print(f"[RETRY {attempt+1}] {word_id} error: {e}")
                await asyncio.sleep(1.0)
        print(f"[FAILED] {word_id} ({text})")

async def main():
    sem = asyncio.Semaphore(5)
    tasks = []

    for word_id, text in HITO_WORDS:
        out_path = os.path.join(AUDIO_DIR, f"{word_id}.mp3")
        tasks.append(synthesize(sem, word_id, text, out_path))

    print(f"Generating audio for {len(tasks)} 'hito' category items using {VOICE}...")
    await asyncio.gather(*tasks)
    print("All 'hito' category audio generation completed!")

if __name__ == '__main__':
    asyncio.run(main())
