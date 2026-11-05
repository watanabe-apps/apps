#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

with open("kotoba_zukan/scripts/targets_audit_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

json_str = json.dumps(data, ensure_ascii=False)

template = """<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ことばずかん 修正対象107画像 一覧ビューア</title>
  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg-page: #f8fafc;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-sub: #64748b;
      --danger: #ef4444;
      --danger-bg: #fef2f2;
      --warning: #f59e0b;
      --warning-bg: #fffbeb;
      --card-size: 190px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
      background: var(--bg-page);
      color: var(--text);
      padding-bottom: 80px;
    }

    header {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .header-top {
      max-width: 1440px;
      margin: 0 auto;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .title-group h1 {
      font-size: 1.3rem;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge-count {
      background: var(--danger-bg);
      color: var(--danger);
      border: 1px solid #fecaca;
      font-size: 0.85rem;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 9999px;
    }

    .nav-links {
      display: flex;
      gap: 8px;
    }

    .nav-btn {
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 8px;
      text-decoration: none;
      border: 1px solid var(--border);
      background: #ffffff;
      color: #334155;
      transition: all 0.15s;
    }

    .nav-btn:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .controls-bar {
      max-width: 1440px;
      margin: 0 auto;
      padding: 10px 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .filter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .tabs-group {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid var(--border);
      background: #ffffff;
      color: #475569;
      transition: all 0.15s;
    }

    .tab-btn:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    .tab-btn.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }

    .tab-btn.danger.active {
      background: var(--danger);
      border-color: var(--danger);
    }

    .tab-btn.warning.active {
      background: #d97706;
      border-color: #d97706;
    }

    .size-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #ffffff;
      padding: 4px 8px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .size-btn {
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 700;
      border: 1px solid transparent;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      color: #475569;
    }

    .size-btn.active {
      background: #e0e7ff;
      color: var(--primary);
      border-color: #c7d2fe;
    }

    .search-box {
      padding: 6px 12px;
      font-size: 0.85rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      width: 220px;
    }

    main {
      max-width: 1440px;
      margin: 20px auto;
      padding: 0 20px;
    }

    .stats-info {
      font-size: 0.9rem;
      color: var(--text-sub);
      margin-bottom: 16px;
      font-weight: 600;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--card-size), 1fr));
      gap: 16px;
    }

    .card {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid var(--border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
      cursor: pointer;
      position: relative;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.1);
      border-color: #cbd5e1;
    }

    .card.group-group1 {
      border-top: 4px solid var(--danger);
    }

    .card.group-group2 {
      border-top: 4px solid #f59e0b;
    }

    .group-pill {
      position: absolute;
      top: 6px;
      left: 6px;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
      z-index: 5;
    }

    .group-pill.p-group1 {
      background: rgba(239, 68, 68, 0.9);
      color: #ffffff;
    }

    .group-pill.p-group2 {
      background: rgba(245, 158, 11, 0.9);
      color: #ffffff;
    }

    .img-wrap {
      width: 100%;
      aspect-ratio: 1 / 1;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 8px;
    }

    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .card-body {
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-top: 1px solid #f1f5f9;
      background: #ffffff;
      flex: 1;
    }

    .card-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 6px;
    }

    .card-name {
      font-size: 1.05rem;
      font-weight: 800;
      color: #1e293b;
    }

    .card-kanji {
      font-size: 0.8rem;
      font-weight: 700;
      color: #64748b;
    }

    .card-cat-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      color: #64748b;
      margin-top: 2px;
    }

    .cat-badge {
      background: #f1f5f9;
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 600;
    }

    .card-issue {
      margin-top: 6px;
      font-size: 0.74rem;
      line-height: 1.35;
      color: #b91c1c;
      background: #fef2f2;
      padding: 6px 8px;
      border-radius: 6px;
      font-weight: 600;
      border-left: 3px solid #ef4444;
    }

    .card.group-group2 .card-issue {
      color: #92400e;
      background: #fffbeb;
      border-left-color: #f59e0b;
    }

    /* Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-overlay.open {
      display: flex;
    }

    .modal-box {
      background: #ffffff;
      border-radius: 16px;
      max-width: 540px;
      width: 100%;
      padding: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: #1e293b;
    }

    .modal-close {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #94a3b8;
    }

    .modal-img-container {
      width: 100%;
      max-height: 340px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
    }

    .modal-img-container img {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
    }

    .modal-issue-box {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 700;
      line-height: 1.4;
    }

    .modal-issue-box.group1 {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }

    .modal-issue-box.group2 {
      background: #fffbeb;
      color: #b45309;
      border: 1px solid #fde68a;
    }

    .modal-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .btn-audio {
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: #f8fafc;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <header>
    <div class="header-top">
      <div class="title-group">
        <h1>🔍 ことばずかん 修正対象画像 一覧ビューア</h1>
        <div class="badge-count" id="badge-total">対象: 107件</div>
      </div>
      <div class="nav-links">
        <a href="index.html" class="nav-btn">📖 ことばずかん本編</a>
        <a href="review.html" class="nav-btn">🛠️ 総合レビュー画面</a>
      </div>
    </div>

    <div class="controls-bar">
      <!-- Group Tabs -->
      <div class="filter-row">
        <div class="tabs-group" id="group-tabs">
          <button class="tab-btn active" onclick="setGroup('all', this)">すべて (107)</button>
          <button class="tab-btn danger" onclick="setGroup('group1', this)">🚨 グループ1: 形状・動作破綻 (49)</button>
          <button class="tab-btn warning" onclick="setGroup('group2', this)">📐 グループ2: 初期ベクター調 (58)</button>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="text" class="search-box" id="search-input" placeholder="単語・漢字で検索..." oninput="handleSearch(this.value)">
          <div class="size-controls">
            <button class="size-btn" onclick="setSize(130, this)">小</button>
            <button class="size-btn active" onclick="setSize(190, this)">中</button>
            <button class="size-btn" onclick="setSize(260, this)">大</button>
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="filter-row">
        <div class="tabs-group" id="cat-tabs">
          <button class="tab-btn active" onclick="setCategory('all', this)">全カテゴリ</button>
          <button class="tab-btn" onclick="setCategory('doubutsu', this)">いきもの</button>
          <button class="tab-btn" onclick="setCategory('tabemono', this)">たべもの</button>
          <button class="tab-btn" onclick="setCategory('norimono', this)">のりもの</button>
          <button class="tab-btn" onclick="setCategory('midikanamono', this)">みぢかなもの</button>
          <button class="tab-btn" onclick="setCategory('ugoki', this)">うごき</button>
          <button class="tab-btn" onclick="setCategory('kimochi', this)">きもち</button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="stats-info" id="stats-info">表示中: 107件</div>
    <div class="grid" id="grid"></div>
  </main>

  <!-- Modal -->
  <div class="modal-overlay" id="modal" onclick="closeModal(event)">
    <div class="modal-box" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div class="modal-title" id="modal-title">単語名</div>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-img-container">
        <img id="modal-img" src="" alt="">
      </div>
      <div class="modal-issue-box" id="modal-issue"></div>
      <div class="modal-actions">
        <button class="btn-audio" onclick="playCurrentAudio()">🔊 音声を聴く</button>
        <button class="tab-btn" onclick="closeModal()">閉じる</button>
      </div>
    </div>
  </div>

  <script>
    const ALL_ITEMS = __JSON_DATA__;

    let currentGroup = 'all';
    let currentCategory = 'all';
    let searchQuery = '';
    let currentModalItem = null;
    const audio = new Audio();

    function render() {
      const grid = document.getElementById('grid');
      grid.innerHTML = '';

      const filtered = ALL_ITEMS.filter(item => {
        if (currentGroup !== 'all' && item.group !== currentGroup) return false;
        if (currentCategory !== 'all' && item.category !== currentCategory) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchKanji = item.tts_text.toLowerCase().includes(q);
          const matchId = item.id.toLowerCase().includes(q);
          const matchIssue = item.issue.toLowerCase().includes(q);
          if (!matchName && !matchKanji && !matchId && !matchIssue) return false;
        }
        return true;
      });

      document.getElementById('stats-info').textContent = `表示中: ${filtered.length}件 / 全107件`;

      filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `card group-${item.group}`;
        card.onclick = () => openModal(item);

        const pillClass = item.group === 'group1' ? 'p-group1' : 'p-group2';

        card.innerHTML = `
          <div class="group-pill ${pillClass}">${item.groupLabel}</div>
          <div class="img-wrap">
            <img src="../common/images/${item.id}.png" alt="${item.name}" loading="lazy">
          </div>
          <div class="card-body">
            <div class="card-header-row">
              <span class="card-name">${item.name}</span>
              <span class="card-kanji">${item.tts_text}</span>
            </div>
            <div class="card-cat-row">
              <span class="cat-badge">${item.categoryName || item.category}</span>
              ${item.subCategoryName ? `<span class="cat-badge">${item.subCategoryName}</span>` : ''}
            </div>
            <div class="card-issue">${item.issue}</div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    function setGroup(group, btn) {
      currentGroup = group;
      document.querySelectorAll('#group-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    }

    function setCategory(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('#cat-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    }

    function handleSearch(val) {
      searchQuery = val.trim();
      render();
    }

    function setSize(size, btn) {
      document.documentElement.style.setProperty('--card-size', size + 'px');
      document.querySelectorAll('.size-controls .size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    function openModal(item) {
      currentModalItem = item;
      document.getElementById('modal-title').textContent = `${item.name} (${item.tts_text}) [${item.id}]`;
      document.getElementById('modal-img').src = `../common/images/${item.id}.png`;
      const issueBox = document.getElementById('modal-issue');
      issueBox.className = `modal-issue-box ${item.group}`;
      issueBox.innerHTML = `
        <div style="font-size: 0.8rem; opacity: 0.8; margin-bottom: 4px;">区分: ${item.groupLabel} | ${item.categoryName} &gt; ${item.subCategoryName}</div>
        <div><strong>課題:</strong> ${item.issue}</div>
      `;
      document.getElementById('modal').classList.add('open');
    }

    function closeModal(e) {
      document.getElementById('modal').classList.remove('open');
    }

    function playCurrentAudio() {
      if (!currentModalItem) return;
      audio.src = `audio/words/${currentModalItem.id}.mp3`;
      audio.play().catch(e => console.warn('Audio play error:', e));
    }

    window.addEventListener('DOMContentLoaded', () => {
      render();
    });
  </script>
</body>
</html>
"""

final_html = template.replace("__JSON_DATA__", json_str)

with open("kotoba_zukan/review_targets.html", "w", encoding="utf-8") as f:
    f.write(final_html)

print(f"Generated kotoba_zukan/review_targets.html successfully!")

