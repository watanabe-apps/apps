#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply review feedback to Kotoba Zukan batch generation.
Reads review_feedback.json (or clipboard text), lists targeted words,
and runs Draw Things generation.
"""

import sys
import os
import json
import subprocess

REVIEW_FILE_DEFAULT = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/review_feedback.json"
MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
BATCH_SCRIPT = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/scripts/batch_drawthings.py"

def load_feedback(path):
    if not os.path.exists(path):
        print(f"Error: Feedback file not found at {path}")
        return None
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def main():
    target_path = sys.argv[1] if len(sys.argv) > 1 else REVIEW_FILE_DEFAULT
    data = load_feedback(target_path)
    if not data:
        print(f"Usage: python apply_review.py [path_to_review_feedback.json]")
        sys.exit(1)

    items = []
    if isinstance(data, dict):
        items = list(data.values())
    elif isinstance(data, list):
        items = data

    if not items:
        print("No items found in feedback file.")
        sys.exit(0)

    print(f"\n==================================================")
    print(f" Review Feedback Loaded: {len(items)} items to regenerate")
    print(f"==================================================")

    target_ids = []
    for idx, it in enumerate(items, 1):
        cid = it.get('id')
        name = it.get('name', '')
        cat = it.get('categoryName', it.get('category', ''))
        reason = it.get('reason', '')
        reason_str = f" (理由: {reason})" if reason else ""
        print(f"[{idx:2d}] {name} ({cid}) [{cat}]{reason_str}")
        if cid:
            target_ids.append(cid)

    ids_arg = ",".join(target_ids)
    print(f"\nTarget IDs: {ids_arg}")
    
    if "--run" in sys.argv:
        print("\nStarting batch generation immediately...")
        cmd = [sys.executable, BATCH_SCRIPT, f"--ids={ids_arg}"]
        subprocess.run(cmd)
    else:
        print("\nTo run generation for these items, execute:")
        print(f"  python kotoba_zukan/scripts/batch_drawthings.py --ids={ids_arg}")

if __name__ == '__main__':
    main()

