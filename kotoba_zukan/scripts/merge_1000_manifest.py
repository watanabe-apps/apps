#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Merge 1000 words into prompts_manifest.json and kotoba_zukan/index.html
"""

import json
import re

from data_doubutsu import NEW_DOUBUTSU
from data_tabemono import NEW_TABEMONO
from data_norimono import NEW_NORIMONO
from data_midikanamono import NEW_MIDIKANAMONO
from data_doushi import NEW_DOUSHI

MANIFEST_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/prompts_manifest.json"
INDEX_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/kotoba_zukan/index.html"

STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"

# Load existing manifest
with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
    existing_manifest = json.load(f)

existing_dict = {item['id']: item for item in existing_manifest}

# Group all 1000 words in clean category order
categories_order = [
    ('doubutsu', 'どうぶつ', NEW_DOUBUTSU),
    ('tabemono', 'たべもの', NEW_TABEMONO),
    ('norimono', 'のりもの', NEW_NORIMONO),
    ('midikanamono', 'みぢかなもの', NEW_MIDIKANAMONO),
    ('doushi', 'どうし', NEW_DOUSHI)
]

final_manifest = []

for cat_id, cat_name, new_items in categories_order:
    # 1. Add existing items in this category first
    for item in existing_manifest:
        if item['category'] == cat_id:
            final_manifest.append(item)
    
    # 2. Add new items in this category
    for word_id, word_name, en_desc in new_items:
        prompt = f"A realistic-leaning educational picture book illustration of {en_desc}{STYLE_SUFFIX}"
        final_manifest.append({
            "id": word_id,
            "name": word_name,
            "category": cat_id,
            "categoryName": cat_name,
            "imageFile": f"{word_id}.png",
            "status": "pending",
            "prompt": prompt
        })

print(f"Total merged manifest items: {len(final_manifest)}")
assert len(final_manifest) == 1000

with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
    json.dump(final_manifest, f, ensure_ascii=False, indent=2)

print("Saved prompts_manifest.json successfully.")

# Now update ALL_WORDS in index.html
all_words_js = []
for item in final_manifest:
    all_words_js.append({
        "id": item["id"],
        "name": item["name"],
        "category": item["category"],
        "categoryName": item["categoryName"]
    })

with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace ALL_WORDS = [...];
new_all_words_str = f"const ALL_WORDS = {json.dumps(all_words_js, ensure_ascii=False)};"
html_updated = re.sub(r'const ALL_WORDS = \[[\s\S]*?\];', new_all_words_str, html, count=1)

# Ensure getWordVisualHtml has a gorgeous fallback for words whose custom SVG isn't hardcoded yet
old_visual_func = """    function getWordVisualHtml(wordId, wordName = '') {
      const svg = SVG_DICT[wordId] || '';
      return `
        <div class="k-visual-wrap">
          <img src="images/${wordId}.png" alt="${wordName}" class="k-visual-img" draggable="false"
            onload="const fb=this.parentElement.querySelector('.k-fallback-svg'); if(fb) fb.style.display='none';"
            onerror="this.style.display='none'; const fb=this.parentElement.querySelector('.k-fallback-svg'); if(fb) fb.style.display='flex';"
            style="-webkit-user-drag:none; user-drag:none; pointer-events:none;">
          <div class="k-fallback-svg">${svg}</div>
        </div>
      `;
    }"""

new_visual_func = """    function getWordVisualHtml(wordId, wordName = '') {
      let svg = SVG_DICT[wordId] || '';
      if (!svg) {
        // 画像生成待ちの単語のための親しみやすいプレースホルダー
        const initial = wordName ? wordName.charAt(0) : '★';
        const item = ALL_WORDS.find(w => w.id === wordId);
        const cat = item ? item.category : 'all';
        const colorMap = {
          doubutsu: '#f97316',
          tabemono: '#ef4444',
          norimono: '#2563eb',
          midikanamono: '#10b981',
          doushi: '#8b5cf6'
        };
        const c = colorMap[cat] || '#3b82f6';
        svg = `<svg viewBox="0 0 100 100" class="k-svg"><rect x="10" y="10" width="80" height="80" rx="18" fill="#f8fafc" stroke="${c}" stroke-width="2.5" stroke-dasharray="4 2"/><circle cx="50" cy="50" r="28" fill="${c}" opacity="0.12"/><text x="50" y="60" text-anchor="middle" font-size="32" font-weight="bold" fill="${c}" font-family="var(--font-family)">${initial}</text></svg>`;
      }
      return `
        <div class="k-visual-wrap">
          <img src="images/${wordId}.png" alt="${wordName}" class="k-visual-img" draggable="false"
            onload="const fb=this.parentElement.querySelector('.k-fallback-svg'); if(fb) fb.style.display='none';"
            onerror="this.style.display='none'; const fb=this.parentElement.querySelector('.k-fallback-svg'); if(fb) fb.style.display='flex';"
            style="-webkit-user-drag:none; user-drag:none; pointer-events:none;">
          <div class="k-fallback-svg">${svg}</div>
        </div>
      `;
    }"""

if old_visual_func in html_updated:
    html_updated = html_updated.replace(old_visual_func, new_visual_func)
    print("Replaced getWordVisualHtml with dynamic initial fallback.")

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    f.write(html_updated)

print("Updated index.html successfully.")
