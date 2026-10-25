#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build the full 1000-word dataset for Kotoba Zukan.
Preserves existing 100 words with their exact IDs, prompts, and status="generated".
Adds 900 curated words with status="pending" and anti-yellow-tint watercolor prompts.
"""

import json
import os

MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"

# Load existing manifest
with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
    existing_manifest = json.load(f)

existing_ids = {item['id'] for item in existing_manifest}
print(f"Loaded {len(existing_manifest)} existing items.")

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"

def make_prompt(desc):
    return f"A realistic-leaning educational picture book illustration of {desc}{STYLE_SUFFIX}"

