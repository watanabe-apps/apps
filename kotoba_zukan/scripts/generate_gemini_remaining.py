#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Automation and pipeline runner for the remaining 9 Gemini illustrations.
Targets:
  - m_buranko: 日本の公園ブランコ
  - m_moufu: 広がっている毛布
  - m_mafura-: イラスト風マフラー
  - t_retasu: 新鮮な丸ごとレタス
  - t_satsumaimo: 割ったホクホク断面つきさつまいも
  - v_oriru: 階段を上手に降りる幼児
  - v_mitsukeru: 「あ！」と見つける幼児
  - v_nigeru: 鬼ごっこで元気に逃げる幼児
  - v_miru: じっと見つめる幼児

Usage:
  # Check status & prompts
  python3 kotoba_zukan/scripts/generate_gemini_remaining.py --status

  # Apply a generated image file to common/images/<id>.png
  python3 kotoba_zukan/scripts/generate_gemini_remaining.py --apply <id> <path_to_jpg_or_png>

  # Scan brain/artifact directory and automatically apply matched images
  python3 kotoba_zukan/scripts/generate_gemini_remaining.py --auto-apply
"""

import sys
import os
import json
import glob
import subprocess
import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))
COMMON_IMAGES_DIR = os.path.join(PROJECT_ROOT, "common", "images")
TARGETS_JSON_PATH = os.path.join(SCRIPT_DIR, "remaining_gemini_targets.json")
BRAIN_DIR = "/Users/watanabetatsuki/.gemini/antigravity/brain/a382f397-33b4-437b-a5d1-e53b23bcbce6"
RESET_UTC_TIMESTAMP = "2026-11-05T13:19:31Z"

def load_targets():
    with open(TARGETS_JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def apply_image(word_id, src_path):
    if not os.path.exists(src_path):
        print(f"❌ Source image not found: {src_path}")
        return False

    dest_path = os.path.join(COMMON_IMAGES_DIR, f"{word_id}.png")
    cmd = ["sips", "-s", "format", "png", "-z", "512", "512", src_path, "--out", dest_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"❌ sips conversion failed for {word_id}: {res.stderr.decode('utf-8')}")
        return False

    size_kb = os.path.getsize(dest_path) / 1024
    print(f"✅ Applied {word_id} -> {dest_path} ({size_kb:.1f} KB)")
    return True

def auto_apply():
    targets = load_targets()
    applied_count = 0
    print("🔍 Scanning brain directory for newly generated images...")
    for item in targets:
        wid = item["id"]
        # Find files like <wid>_*.jpg or target_<wid>.png in BRAIN_DIR
        patterns = [
            os.path.join(BRAIN_DIR, f"{wid}_*.jpg"),
            os.path.join(BRAIN_DIR, f"{wid}_*.png"),
            os.path.join(BRAIN_DIR, f"target_{wid}.png")
        ]
        matched = []
        for p in patterns:
            matched.extend(glob.glob(p))
        if matched:
            # Pick latest modified
            matched.sort(key=os.path.getmtime, reverse=True)
            latest = matched[0]
            print(f"Found candidate for {wid}: {latest}")
            if apply_image(wid, latest):
                applied_count += 1
        else:
            print(f"⏳ Waiting for generation: {wid} ({item['name']})")
    print(f"\n🎉 Auto-apply finished: {applied_count}/{len(targets)} images updated.")

def print_status():
    targets = load_targets()
    print("=====================================================================")
    print(" 🎨 ことばずかん 残り9点 Gemini画像生成スタンバイステータス")
    print("=====================================================================")
    print(f"API クォータ回復予定時刻: 2026年11月5日 22:19 JST (UTC 13:19:31)")
    print(f"対象語彙数: {len(targets)} 件\n")

    for idx, item in enumerate(targets, 1):
        wid = item["id"]
        img_path = os.path.join(COMMON_IMAGES_DIR, f"{wid}.png")
        exists = os.path.exists(img_path)
        mtime_str = ""
        if exists:
            mtime = datetime.datetime.fromtimestamp(os.path.getmtime(img_path))
            mtime_str = mtime.strftime("%m/%d %H:%M")
        
        print(f"[{idx}/9] {item['name']} (`{wid}`)")
        print(f"      指示: {item['user_instruction']}")
        print(f"      意図: {item['reason']}")
        print(f"      現画像: {'あり (' + mtime_str + ')' if exists else '未配置'}")
        print(f"      Prompt: {item['prompt'][:90]}...")
        print("---------------------------------------------------------------------")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "--status":
            print_status()
        elif sys.argv[1] == "--auto-apply":
            auto_apply()
        elif sys.argv[1] == "--apply" and len(sys.argv) >= 4:
            apply_image(sys.argv[2], sys.argv[3])
        else:
            print(__doc__)
    else:
        print_status()

