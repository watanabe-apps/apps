#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Draw Things Studio - Local VS Code Companion Server
Connects Draw Things local API (7860) with an interactive web UI.
Runs completely inside VS Code via Simple Browser.
"""

import os
import sys
import json
import base64
import time
import urllib.request
import urllib.error
from http.server import HTTPServer, BaseHTTPRequestHandler
import mimetypes

PORT = 8085
DRAW_THINGS_API = "http://127.0.0.1:7860/sdapi/v1/txt2img"
BASE_DIR = "/Users/watanabetatsuki/Documents/GitHub/apps"
COMMON_IMAGES_DIR = os.path.join(BASE_DIR, "common", "images")
VOCAB_JS_PATH = os.path.join(BASE_DIR, "common", "vocab.js")
TEMP_CACHE_DIR = os.path.join(BASE_DIR, "kotoba_zukan", "scripts", "candidates")
os.makedirs(TEMP_CACHE_DIR, exist_ok=True)

HISTORY_FILE = os.path.join(TEMP_CACHE_DIR, "history.json")
HISTORY_JS_FILE = os.path.join(TEMP_CACHE_DIR, "history.js")

def load_history():
    history = []
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                history = json.load(f)
        except Exception as e:
            print("Error loading history.json:", e)
            history = []
            
    # Verify that files actually exist and filter out dead entries
    valid_history = []
    seen_urls = set()
    for item in history:
        url = item.get('url', '')
        if not url or url in seen_urls:
            continue
        fname = url.replace('/images/', '').split('?')[0]
        fpath = os.path.join(TEMP_CACHE_DIR, fname)
        if not os.path.exists(fpath):
            fpath = os.path.join(COMMON_IMAGES_DIR, fname)
        if os.path.exists(fpath):
            valid_history.append(item)
            seen_urls.add(url)

    # Also scan candidates directory for any PNG files generated externally (e.g. from chat script)
    try:
        cand_files = sorted(
            [f for f in os.listdir(TEMP_CACHE_DIR) if f.lower().endswith('.png')],
            key=lambda f: os.path.getmtime(os.path.join(TEMP_CACHE_DIR, f)),
            reverse=True
        )
        for fname in cand_files:
            url = f"/images/{fname}"
            if url not in seen_urls:
                parts = fname.replace('.png', '').split('_')
                word_id = None
                if len(parts) >= 3 and parts[0] in ('studio', 'candidate', 'backup'):
                    word_id = f"{parts[1]}_{parts[2]}"
                elif len(parts) >= 2:
                    word_id = f"{parts[0]}_{parts[1]}"
                mtime = int(os.path.getmtime(os.path.join(TEMP_CACHE_DIR, fname)) * 1000)
                entry = {
                    "url": url,
                    "word_id": word_id or fname,
                    "timestamp": mtime
                }
                valid_history.append(entry)
                seen_urls.add(url)
    except Exception as e:
        print("Error scanning candidates:", e)

    valid_history.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
    return valid_history[:60]

def save_history(history):
    try:
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
        with open(HISTORY_JS_FILE, 'w', encoding='utf-8') as f:
            f.write("window.DT_CACHED_HISTORY = " + json.dumps(history, ensure_ascii=False, indent=2) + ";\n")
    except Exception as e:
        print("Error saving history:", e)

def add_to_history(entry):
    history = load_history()
    history = [h for h in history if h.get('url') != entry.get('url')]
    history.insert(0, entry)
    save_history(history[:60])
    return history

def extract_vocab_items():
    items = []
    if not os.path.exists(VOCAB_JS_PATH):
        return items
    try:
        with open(VOCAB_JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract VOCAB_LIST JSON array
        start = content.find("const VOCAB_LIST = [")
        if start != -1:
            array_start = content.find("[", start)
            # Find the closing array bracket
            # Since vocab.js is structured, let's find the matching bracket
            depth = 0
            array_end = -1
            for i in range(array_start, len(content)):
                if content[i] == '[':
                    depth += 1
                elif content[i] == ']':
                    depth -= 1
                    if depth == 0:
                        array_end = i + 1
                        break
            if array_end != -1:
                json_str = content[array_start:array_end]
                # Fix trailing commas or js syntax if needed
                import re
                json_str = re.sub(r',\s*\]', ']', json_str)
                raw_items = json.loads(json_str)
                for it in raw_items:
                    word_id = it.get('id')
                    exists = os.path.exists(os.path.join(COMMON_IMAGES_DIR, f"{word_id}.png"))
                    items.append({
                        "id": word_id,
                        "name": it.get('name'),
                        "tts_text": it.get('tts_text', it.get('name')),
                        "category": it.get('categoryName', it.get('category', '')),
                        "subCategory": it.get('subCategoryName', it.get('subCategory', '')),
                        "prompt": it.get('prompt', ''),
                        "image": f"/images/{word_id}.png",
                        "has_image": exists
                    })
    except Exception as e:
        print("Error parsing vocab.js:", e)
    return items

HTML_UI = """<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Draw Things Studio for VS Code</title>
  <style>
    :root {
      --bg: #1e1e24;
      --panel: #282830;
      --panel-border: #383844;
      --text: #f0f0f5;
      --text-muted: #9595a5;
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --accent: #06b6d4;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      height: 100vh;
      overflow: hidden;
      user-select: none;
    }

    /* Left Sidebar */
    .sidebar {
      width: 360px;
      min-width: 320px;
      background: var(--panel);
      border-right: 1px solid var(--panel-border);
      display: flex;
      flex-direction: column;
      z-index: 10;
    }
    .header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--panel-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header h1 {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header .status-badge {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 12px;
      background: rgba(16, 185, 129, 0.15);
      color: var(--success);
      font-weight: 600;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      justify-content: space-between;
    }
    select, input, textarea {
      background: #18181c;
      border: 1px solid var(--panel-border);
      border-radius: 6px;
      color: var(--text);
      font-size: 13px;
      padding: 8px 10px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
    }
    select:focus, input:focus, textarea:focus {
      border-color: var(--primary);
    }
    textarea {
      resize: vertical;
      min-height: 80px;
      line-height: 1.4;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
    }

    .btn {
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .btn:hover:not(:disabled) {
      background: var(--primary-hover);
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-success {
      background: var(--success);
    }
    .btn-success:hover:not(:disabled) {
      background: #059669;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid var(--panel-border);
      color: var(--text);
    }
    .btn-outline:hover:not(:disabled) {
      background: #33333e;
    }

    /* History Grid in sidebar */
    .history-section {
      margin-top: 8px;
    }
    .history-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      max-height: 140px;
      overflow-y: auto;
      padding-top: 4px;
    }
    .history-thumb {
      aspect-ratio: 1;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      background: #111;
      position: relative;
    }
    .history-thumb.active {
      border-color: var(--accent);
    }
    .history-thumb img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: white;
    }

    /* Main Canvas Area */
    .main-canvas {
      flex: 1;
      position: relative;
      background: #141418;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .viewport {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      position: relative;
      touch-action: none;
    }
    .viewport:active {
      cursor: grabbing;
    }

    .image-wrapper {
      position: absolute;
      transform-origin: center center;
      transition: box-shadow 0.2s;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      border-radius: 4px;
      overflow: hidden;
      background: white;
      max-width: none;
      max-height: none;
    }
    .image-wrapper img {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* Canvas Floating Overlay Controls */
    .canvas-hud {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(30, 30, 36, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid var(--panel-border);
      border-radius: 30px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 50;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }
    .hud-btn {
      background: none;
      border: none;
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .hud-btn:hover {
      background: rgba(255,255,255,0.1);
    }
    .hud-scale {
      font-size: 12px;
      color: var(--text-muted);
      min-width: 48px;
      text-align: center;
      font-family: ui-monospace, monospace;
    }

    /* Floating Generating Pip / Progress Window (TOP-LEFT!) */
    .pip-window {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 240px;
      background: rgba(26, 26, 32, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid var(--panel-border);
      border-radius: 10px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.6);
      z-index: 100;
      display: none;
      flex-direction: column;
      overflow: hidden;
      cursor: move;
      animation: popIn 0.25s ease-out;
    }
    .pip-window.active {
      display: flex;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.9) translateY(-10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .pip-header {
      padding: 8px 12px;
      background: #23232c;
      border-bottom: 1px solid var(--panel-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .pip-content {
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .pip-preview-box {
      width: 140px;
      height: 140px;
      border-radius: 6px;
      background: #111;
      border: 1px dashed var(--panel-border);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .pip-preview-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .pip-status {
      font-size: 12px;
      color: var(--text);
      text-align: center;
      font-weight: 500;
    }
    .pip-time {
      font-size: 11px;
      color: var(--text-muted);
      font-family: ui-monospace, monospace;
    }
    .pip-progress-bar {
      width: 100%;
      height: 4px;
      background: #333;
      border-radius: 2px;
      overflow: hidden;
    }
    .pip-progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      transition: width 0.3s;
    }

    /* Word Pill Badge */
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
      background: #333;
      color: #aaa;
    }
    .badge-qwen {
      background: rgba(79, 70, 229, 0.2);
      color: #818cf8;
    }
  </style>
</head>
<body>

  <!-- Left Sidebar Controls -->
  <div class="sidebar">
    <div class="header">
      <h1>🎨 Draw Things Studio</h1>
      <span class="status-badge" id="serverStatus">Connected (7860)</span>
    </div>

    <div class="sidebar-content">
      <!-- Target Word Selection -->
      <div class="form-group">
        <div class="form-label">
          <span>ことばずかん 単語選択</span>
          <span class="badge badge-qwen" id="vocabCount">0 items</span>
        </div>
        <select id="vocabSelect" onchange="onWordSelected()">
          <option value="">-- 単語を選択してください --</option>
        </select>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex; gap:8px;">
        <button class="btn" style="flex:1;" id="genBtn" onclick="startGeneration()">
          <span>🚀 生成開始</span>
        </button>
        <button class="btn btn-success" id="applyBtn" onclick="applyToKotobaZukan()" title="ことばずかんに本番反映" disabled>
          <span>✨ 図鑑に保存</span>
        </button>
      </div>

      <!-- Prompt Input -->
      <div class="form-group">
        <div class="form-label">プロンプト (Prompt)</div>
        <textarea id="promptInput" placeholder="プロンプトを入力..."></textarea>
      </div>

      <!-- Advanced Params (collapsible/compact) -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
        <div class="form-group">
          <div class="form-label">解像度 (Size)</div>
          <select id="sizeSelect">
            <option value="1024x1024" selected>1024 × 1024 (推奨)</option>
            <option value="512x512">512 × 512</option>
          </select>
        </div>
        <div class="form-group">
          <div class="form-label">ステップ数 (Steps)</div>
          <input type="number" id="stepsInput" value="8" min="4" max="50">
        </div>
      </div>

      <!-- History of Generated Images -->
      <div class="history-section">
        <div class="form-label" style="margin-bottom:6px;">
          <span>生成履歴 (History)</span>
          <span style="font-size:10px; cursor:pointer; color:var(--accent);" onclick="resetZoom()">リセット</span>
        </div>
        <div class="history-grid" id="historyGrid">
          <!-- Thumbnails injected here -->
        </div>
      </div>

    </div>
  </div>

  <!-- Main Canvas (Freedom Zoom & Pan) -->
  <div class="main-canvas" id="canvasContainer">

    <!-- FLOATING PIP PROGRESS WINDOW (TOP-LEFT) -->
    <div class="pip-window" id="pipWindow">
      <div class="pip-header">
        <span>⚡ 次の画像を生成中</span>
        <span class="pip-time" id="pipTimer">00:00</span>
      </div>
      <div class="pip-content">
        <div class="pip-preview-box" id="pipPreviewBox">
          <div class="spinner" id="pipSpinner"></div>
          <img id="pipPreviewImg" style="display:none;" />
        </div>
        <div class="pip-status" id="pipStatus">Draw Things で計算中...</div>
        <div class="pip-progress-bar">
          <div class="pip-progress-fill" id="pipProgressFill"></div>
        </div>
      </div>
    </div>

    <!-- The Viewport with Zoomable Image -->
    <div class="viewport" id="viewport">
      <div class="image-wrapper" id="imageWrapper">
        <img id="mainImage" src="" alt="No Image" style="display:none;" />
      </div>
    </div>

    <!-- HUD Controls on Canvas -->
    <div class="canvas-hud">
      <button class="hud-btn" onclick="zoomIn()">➕ 拡大</button>
      <span class="hud-scale" id="scaleIndicator">100%</span>
      <button class="hud-btn" onclick="zoomOut()">➖ 縮小</button>
      <div style="width:1px; height:16px; background:#444;"></div>
      <button class="hud-btn" onclick="resetZoom()">🔲 フィット</button>
      <button class="hud-btn" onclick="zoomActual()">🔍 100% (原寸)</button>
    </div>

  </div>

  <script>
    // State
    let currentScale = 1.0;
    let panX = 0, panY = 0;
    let isDragging = false;
    let startX, startY;
    let isGenerating = false;
    let genStartTime = 0;
    let genTimerInterval = null;
    let currentImageData = null;
    let currentWord = null;
    let historyList = [];

    const STYLE_SUFFIX = ", clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration";
    const NEGATIVE_PROMPT = "photograph, realistic photo, 3d render, yellow tint, sepia, yellowish, aged paper, parchment, dirty background, complex background, scenery, dark background, noisy, messy, blurry, low quality, text, watermark, signature, borders, frames";

    // Load initial vocab
    async function init() {
      try {
        const res = await fetch('/api/words');
        const words = await res.json();
        const select = document.getElementById('vocabSelect');
        document.getElementById('vocabCount').innerText = `${words.length} items`;
        
        words.forEach(w => {
          const opt = document.createElement('option');
          opt.value = w.id;
          opt.innerText = `${w.name} (${w.id})`;
          opt.dataset.item = JSON.stringify(w);
          select.appendChild(opt);
        });

        // Load recent images
        const hRes = await fetch('/api/recent_images');
        const hData = await hRes.json();
        if (hData && hData.length > 0) {
          hData.forEach(item => addHistory(item, false));
          displayImage(hData[0].url, hData[0]);
        }
      } catch (e) {
        console.error("Init error:", e);
      }
      setupCanvasInteractions();
      setupPipDrag();
    }

    function onWordSelected() {
      const select = document.getElementById('vocabSelect');
      const opt = select.selectedOptions[0];
      if (!opt || !opt.value) return;
      
      const item = JSON.parse(opt.dataset.item);
      currentWord = item;
      
      // Auto craft prompt
      const prompt = `Japanese picture book watercolor illustration of a cute ${item.name} (${item.name} / ${item.tts_text}), warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.`;
      document.getElementById('promptInput').value = prompt;

      // If existing image exists, preview it
      if (item.has_image) {
        displayImage(`/images/${item.id}.png`, { id: item.id, prompt: prompt });
      }
    }

    // Zoom & Pan Engine
    function setupCanvasInteractions() {
      const viewport = document.getElementById('viewport');
      const wrapper = document.getElementById('imageWrapper');

      viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
        updateScale(currentScale * zoomFactor);
      }, { passive: false });

      viewport.addEventListener('mousedown', (e) => {
        if (e.target.closest('.canvas-hud') || e.target.closest('.pip-window')) return;
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        applyTransform();
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }

    function updateScale(newScale) {
      currentScale = Math.min(Math.max(newScale, 0.1), 8.0);
      document.getElementById('scaleIndicator').innerText = `${Math.round(currentScale * 100)}%`;
      applyTransform();
    }

    function applyTransform() {
      const wrapper = document.getElementById('imageWrapper');
      wrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
    }

    function resetZoom() {
      panX = 0;
      panY = 0;
      currentScale = 0.65; // Nice fit for 1024px
      document.getElementById('scaleIndicator').innerText = `${Math.round(currentScale * 100)}%`;
      applyTransform();
    }

    function zoomActual() {
      panX = 0;
      panY = 0;
      updateScale(1.0);
    }

    function zoomIn() { updateScale(currentScale * 1.25); }
    function zoomOut() { updateScale(currentScale * 0.8); }

    // Display image on main canvas
    function displayImage(url, metadata) {
      const img = document.getElementById('mainImage');
      img.src = url;
      img.style.display = 'block';
      currentImageData = { url, metadata };
      document.getElementById('applyBtn').disabled = false;
      resetZoom();
    }

    // Floating PIP drag
    function setupPipDrag() {
      const pip = document.getElementById('pipWindow');
      let isPipDrag = false, pX = 0, pY = 0;

      pip.addEventListener('mousedown', (e) => {
        isPipDrag = true;
        pX = e.clientX - pip.offsetLeft;
        pY = e.clientY - pip.offsetTop;
      });
      window.addEventListener('mousemove', (e) => {
        if (!isPipDrag) return;
        pip.style.left = `${Math.max(10, e.clientX - pX)}px`;
        pip.style.top = `${Math.max(10, e.clientY - pY)}px`;
      });
      window.addEventListener('mouseup', () => { isPipDrag = false; });
    }

    // Start Generation
    async function startGeneration() {
      if (isGenerating) return;
      const prompt = document.getElementById('promptInput').value.trim();
      if (!prompt) {
        alert("プロンプトを入力してください");
        return;
      }

      const sizeStr = document.getElementById('sizeSelect').value;
      const [w, h] = sizeStr.split('x').map(Number);
      const steps = parseInt(document.getElementById('stepsInput').value, 10) || 8;

      isGenerating = true;
      document.getElementById('genBtn').disabled = true;

      // SHOW FLOATING PIP WINDOW (TOP-LEFT)
      const pip = document.getElementById('pipWindow');
      pip.classList.add('active');
      document.getElementById('pipSpinner').style.display = 'block';
      document.getElementById('pipPreviewImg').style.display = 'none';
      document.getElementById('pipStatus').innerText = "Draw Things で生成中...";
      
      genStartTime = Date.now();
      clearInterval(genTimerInterval);
      const estTotal = 56; // 1024 takes ~56s on M4 Pro Qwen
      genTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - genStartTime) / 1000);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        document.getElementById('pipTimer').innerText = `${mins}:${secs}`;
        const pct = Math.min(Math.round((elapsed / estTotal) * 100), 96);
        document.getElementById('pipProgressFill').style.width = `${pct}%`;
      }, 500);

      try {
        const payload = {
          prompt: prompt,
          negative_prompt: NEGATIVE_PROMPT,
          width: w,
          height: h,
          steps: steps,
          word_id: currentWord ? currentWord.id : null
        };

        const resp = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const res = await resp.json();
        if (res.error) {
          alert("生成エラー: " + res.error);
        } else if (res.image_url) {
          // Completed!
          document.getElementById('pipProgressFill').style.width = '100%';
          document.getElementById('pipStatus').innerText = "生成完了！";
          
          // Show in history and switch main image
          const item = {
            url: res.image_url,
            word_id: currentWord ? currentWord.id : 'gen_' + Date.now(),
            prompt: prompt,
            timestamp: Date.now()
          };
          addHistory(item, true);
          displayImage(res.image_url, item);
        }
      } catch (err) {
        alert("通信エラー: " + err);
      } finally {
        isGenerating = false;
        clearInterval(genTimerInterval);
        document.getElementById('genBtn').disabled = false;
        setTimeout(() => {
          pip.classList.remove('active');
        }, 1500);
      }
    }

    function addHistory(item, prepend = true) {
      historyList.unshift(item);
      const grid = document.getElementById('historyGrid');
      const thumb = document.createElement('div');
      thumb.className = 'history-thumb active';
      thumb.innerHTML = `<img src="${item.url}" />`;
      thumb.onclick = () => {
        document.querySelectorAll('.history-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        displayImage(item.url, item);
      };

      if (prepend && grid.firstChild) {
        grid.insertBefore(thumb, grid.firstChild);
      } else {
        grid.appendChild(thumb);
      }
    }

    async function applyToKotobaZukan() {
      if (!currentImageData || !currentWord) {
        alert("対象の単語が選択されていません");
        return;
      }

      if (!confirm(`単語「${currentWord.name}」(${currentWord.id}) の本番画像として保存しますか？`)) {
        return;
      }

      try {
        const res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            word_id: currentWord.id,
            image_url: currentImageData.url
          })
        });
        const data = await res.json();
        if (data.success) {
          alert(`「${currentWord.name}」の画像を本番に反映しました！`);
        } else {
          alert("保存エラー: " + data.error);
        }
      } catch (e) {
        alert("エラー: " + e);
      }
    }

    window.onload = init;
  </script>
</body>
</html>
"""

STUDIO_HTML_PATH = os.path.join(BASE_DIR, "kotoba_zukan", "studio.html")

class StudioHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        clean_path = self.path.split('?')[0]

        if clean_path in ('/', '/index.html', '/studio.html'):
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            if os.path.exists(STUDIO_HTML_PATH):
                with open(STUDIO_HTML_PATH, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(HTML_UI.encode('utf-8'))
            return

        if clean_path in ('/review.html', '/kotoba_zukan/review.html'):
            review_file = os.path.join(BASE_DIR, "kotoba_zukan", "review.html")
            if os.path.exists(review_file):
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                with open(review_file, 'rb') as f:
                    self.wfile.write(f.read())
                return

        if self.path == '/api/words':
            words = extract_vocab_items()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(words, ensure_ascii=False).encode('utf-8'))
            return

        if self.path == '/api/recent_images':
            history = load_history()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(history, ensure_ascii=False).encode('utf-8'))
            return

        if self.path.startswith('/images/'):
            # Serve common image
            filename = self.path[len('/images/'):].split('?')[0]
            file_path = os.path.join(COMMON_IMAGES_DIR, filename)
            if not os.path.exists(file_path):
                # Try temp candidate
                file_path = os.path.join(TEMP_CACHE_DIR, filename)

            if os.path.exists(file_path):
                self.send_response(200)
                mime = mimetypes.guess_type(file_path)[0] or 'image/png'
                self.send_header('Content-Type', mime)
                self.end_headers()
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
                return
            else:
                self.send_response(404)
                self.end_headers()
                return

        # Serve other static files from BASE_DIR (e.g. common/vocab.js, etc.)
        rel_path = clean_path.lstrip('/')
        safe_path = os.path.normpath(os.path.join(BASE_DIR, rel_path))
        if safe_path.startswith(BASE_DIR) and os.path.isfile(safe_path):
            self.send_response(200)
            mime = mimetypes.guess_type(safe_path)[0] or 'application/octet-stream'
            if mime.startswith('text/') or mime in ('application/javascript', 'application/json'):
                mime += '; charset=utf-8'
            self.send_header('Content-Type', mime)
            self.end_headers()
            with open(safe_path, 'rb') as f:
                self.wfile.write(f.read())
            return

        self.send_response(404)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/generate':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            req_data = json.loads(body.decode('utf-8'))

            prompt = req_data.get('prompt')
            negative = req_data.get('negative_prompt', '')
            width = req_data.get('width', 1024)
            height = req_data.get('height', 1024)
            steps = req_data.get('steps', 8)
            word_id = req_data.get('word_id') or f"gen_{int(time.time())}"

            # Prepare Draw Things txt2img payload
            dt_payload = {
                "prompt": prompt,
                "negative_prompt": negative,
                "width": width,
                "height": height,
                "steps": steps,
                "cfg_scale": 1.0,
                "batch_size": 1
            }

            try:
                dt_req = urllib.request.Request(
                    DRAW_THINGS_API,
                    data=json.dumps(dt_payload).encode('utf-8'),
                    headers={"Content-Type": "application/json"}
                )
                with urllib.request.urlopen(dt_req, timeout=300) as resp:
                    res_json = json.loads(resp.read().decode('utf-8'))
                    img_b64 = res_json['images'][0]
                    img_bytes = base64.b64decode(img_b64)

                    filename = f"studio_{word_id}_{int(time.time())}.png"
                    save_path = os.path.join(TEMP_CACHE_DIR, filename)
                    with open(save_path, 'wb') as f:
                        f.write(img_bytes)
                        f.flush()
                        os.fsync(f.fileno())

                    img_url = f"/images/{filename}"
                    hist_entry = {
                        "url": img_url,
                        "word_id": word_id,
                        "prompt": prompt,
                        "timestamp": int(time.time() * 1000)
                    }
                    add_to_history(hist_entry)

                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Connection', 'keep-alive')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        "image_url": img_url,
                        "filename": filename,
                        "word_id": word_id
                    }).encode('utf-8'))
                    return
            except Exception as e:
                print(f"❌ Draw Things Generation error: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
                return

        if self.path == '/api/save':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            req_data = json.loads(body.decode('utf-8'))

            word_id = req_data.get('word_id')
            image_url = req_data.get('image_url') or req_data.get('filename')

            if not word_id or not image_url:
                self.send_response(400)
                self.end_headers()
                return

            # Robust filename extraction (handles relative paths, http urls, etc.)
            clean_url = image_url.split('?')[0]
            filename = os.path.basename(clean_url)
            src_path = os.path.join(TEMP_CACHE_DIR, filename)
            if not os.path.exists(src_path):
                src_path = os.path.join(COMMON_IMAGES_DIR, filename)

            if os.path.exists(src_path):
                dest_path = os.path.join(COMMON_IMAGES_DIR, f"{word_id}.png")

                # Backup old production image before overwriting
                if os.path.exists(dest_path):
                    ts = int(time.time())
                    backup_filename = f"backup_{word_id}_{ts}.png"
                    backup_path = os.path.join(TEMP_CACHE_DIR, backup_filename)
                    try:
                        import shutil
                        shutil.copy2(dest_path, backup_path)
                        add_to_history({
                            "url": f"/images/{backup_filename}",
                            "word_id": word_id,
                            "is_backup": True,
                            "label": f"【旧画像バックアップ】{word_id}",
                            "timestamp": int(time.time() * 1000) - 1
                        })
                    except Exception as be:
                        print("Backup creation error:", be)

                with open(src_path, 'rb') as f_src:
                    with open(dest_path, 'wb') as f_dst:
                        f_dst.write(f_src.read())
                        f_dst.flush()
                        os.fsync(f_dst.fileno())

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "saved_to": dest_path}).encode('utf-8'))
                return
            else:
                print(f"❌ /api/save: Source image not found. Checked: {src_path} (from {image_url})")
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Source image not found: {filename}"}).encode('utf-8'))
                return

        if self.path == '/api/discard':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            req_data = json.loads(body.decode('utf-8'))
            image_url = req_data.get('image_url') or req_data.get('filename')

            if image_url:
                clean_url = image_url.split('?')[0]
                filename = os.path.basename(clean_url)
                temp_path = os.path.join(TEMP_CACHE_DIR, filename)
                if os.path.exists(temp_path):
                    try:
                        os.remove(temp_path)
                    except Exception as e:
                        print("Error removing temp file:", e)

                # Remove from persistent history
                history = [item for item in load_history() if os.path.basename(item.get('url', '').split('?')[0]) != filename]
                save_history(history)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

if __name__ == '__main__':
    print(f"Starting Draw Things Studio on http://127.0.0.1:{PORT} (all interfaces)")
    server = HTTPServer(('0.0.0.0', PORT), StudioHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
