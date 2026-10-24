/**
 * しゃしんパズル (Photo Puzzle)
 * 既存アプリの設計思想に準拠
 * - レスポンシブ2カラム設定画面（スペースを有効活用）
 * - プレイ画面を忠実に再現したリアルタイム・サンプルビュー
 * - 戻るボタンの表示・非表示設定
 * - 高品質な動物イラストのパズル画像
 * - 高速・確実な起動（真っ白画面防止）
 */

// --- 1. 効果音プレイヤー ---
class SoundPlayer {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTik() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
    }

    playPinpon() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(784, now);
        gain1.gain.setValueAtTime(0.5, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.5);

        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659, now + 0.35);
        gain2.gain.setValueAtTime(0.5, now + 0.35);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(now + 0.35);
        osc2.stop(now + 1.2);
    }
}

// --- 2. 写真データベース管理 (IndexedDB) ---
class PhotoDatabase {
    constructor() {
        this.dbName = 'PhotoPuzzleDB';
        this.storeName = 'images';
        this.version = 1;
        this.db = null;
    }

    open() {
        return new Promise((resolve, reject) => {
            if (this.db) return resolve(this.db);
            const req = indexedDB.open(this.dbName, this.version);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = (e) => reject(e);
        });
    }

    async getAll() {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(this.storeName, 'readonly');
                const store = tx.objectStore(this.storeName);
                const req = store.getAll();
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.warn('DB getAll error, falling back to empty', e);
            return [];
        }
    }

    async add(item) {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(this.storeName, 'readwrite');
                const store = tx.objectStore(this.storeName);
                const req = store.put(item);
                req.onsuccess = () => resolve(item);
                req.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.warn('DB add error', e);
        }
    }

    async delete(id) {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(this.storeName, 'readwrite');
                const store = tx.objectStore(this.storeName);
                const req = store.delete(id);
                req.onsuccess = () => resolve();
                req.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.warn('DB delete error', e);
        }
    }

    async clearCustom() {
        try {
            const all = await this.getAll();
            const db = await this.open();
            const tx = db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            for (const item of all) {
                if (!item.isPreset) {
                    store.delete(item.id);
                }
            }
            return new Promise((resolve) => {
                tx.oncomplete = () => resolve();
            });
        } catch (e) {
            console.warn('DB clearCustom error', e);
        }
    }

    async clearAll() {
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(this.storeName, 'readwrite');
                const store = tx.objectStore(this.storeName);
                const req = store.clear();
                req.onsuccess = () => resolve();
                req.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.warn('DB clearAll error', e);
        }
    }
}

// --- 3. ピースクラス ---
class Piece {
    constructor(options) {
        this.id = 'p_' + Math.random().toString(36).substr(2, 9);
        this.groupID = null;
        this.row = options.row;
        this.column = options.column;
        this.startPosition = { ...options.position };
        this.position = { ...options.position };
        this.offset = { ...options.offset };
        this.rotation = options.rotation;
        this.zIndex = options.zIndex || 1;
        this.canvas = options.canvas;
        this.width = options.width;
        this.height = options.height;
        this.isBlank = Boolean(options.isBlank);
        this.element = null;
    }
}

// --- 4. メインアプリケーション ---
class PhotoPuzzleApp {
    constructor() {
        this.soundPlayer = new SoundPlayer();
        this.db = new PhotoDatabase();

        // 設定値
        this.row = parseInt(localStorage.getItem('puzzle_row') || '1', 10);
        this.column = parseInt(localStorage.getItem('puzzle_col') || '2', 10);
        this.questions = parseInt(localStorage.getItem('puzzle_questions') || '10', 10);
        this.allowRotation = localStorage.getItem('puzzle_allow_rotation') !== 'false';
        this.showBackButton = localStorage.getItem('puzzle_show_back_btn') !== 'false';
        this.liveSnap = localStorage.getItem('puzzle_live_snap') === 'true'; // ドラッグ中にも吸着する設定（デフォルトOFF）

        // 状態
        this.numOfClear = 0;
        this.clear = false;
        this.pieces = [];
        this.images = this.getDefaultPresets(); // 初期状態から即時使用可能にしておく
        this.currentImage = null;
        // マルチタッチ・複数同時ドラッグ管理 (pointerId => session)
        this.activePointers = new Map();
        this.maxZIndex = 10;

        // トリプルタップ
        this.settingTapCount = 0;
        this.settingTapTimer = null;

        // DOM参照
        this.dom = {
            homeScreen: document.getElementById('home-screen'),
            playScreen: document.getElementById('play-screen'),
            settingScreen: document.getElementById('setting-screen'),

            btnStart: document.getElementById('btn-start'),
            btnSetting: document.getElementById('btn-setting'),
            btnBackHome: document.getElementById('btn-back-home'),

            clearCount: document.getElementById('clear-count'),
            puzzleStage: document.getElementById('puzzle-stage'),
            nextOverlay: document.getElementById('next-overlay'),
            btnNext: document.getElementById('btn-next'),

            sliderRows: document.getElementById('slider-rows'),
            labelRows: document.getElementById('label-rows'),
            sliderCols: document.getElementById('slider-cols'),
            labelCols: document.getElementById('label-cols'),
            previewBox: document.getElementById('preview-box'),
            previewStage: document.getElementById('preview-stage'),
            previewBtnBack: document.getElementById('preview-btn-back'),

            sliderQuestions: document.getElementById('slider-questions'),
            labelQuestions: document.getElementById('label-questions'),
            toggleRotation: document.getElementById('toggle-rotation'),
            toggleBackBtn: document.getElementById('toggle-back-btn'),
            toggleLiveSnap: document.getElementById('toggle-live-snap'),

            fileInput: document.getElementById('file-input'),
            photoList: document.getElementById('photo-list'),
            btnClearCustom: document.getElementById('btn-clear-custom'),
            btnResetPresets: document.getElementById('btn-reset-presets'),
            btnDone: document.getElementById('btn-done')
        };

        this.init();
    }

    getDefaultPresets() {
        return [
            { id: 'preset_raion', name: 'ライオン', url: 'images/raion.png', isPreset: true },
            { id: 'preset_panda', name: 'パンダ', url: 'images/panda.png', isPreset: true },
            { id: 'preset_zou', name: 'ゾウ', url: 'images/zou.png', isPreset: true },
            { id: 'preset_kirin', name: 'キリン', url: 'images/kirin.png', isPreset: true },
            { id: 'preset_usagi', name: 'ウサギ', url: 'images/usagi.png', isPreset: true },
            { id: 'preset_kuma', name: 'クマ', url: 'images/kuma.png', isPreset: true }
        ];
    }

    async init() {
        this.bindEvents();
        this.syncSettingInputs();

        // データベースから画像を復元
        await this.loadImagesFromDB();

        // サンプルビュー初期描画
        this.updateSampleView();

        // 画面リサイズ対応
        window.addEventListener('resize', () => {
            if (this.dom.playScreen.classList.contains('active') && this.currentImage) {
                this.setupPuzzle();
            }
            if (this.dom.settingScreen.classList.contains('active')) {
                this.updateSampleView();
            }
        });

        // 自動スタート対応 (スクリーンショットや直起動用)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('play') === '1') {
            this.startPlay();
        }
    }

    bindEvents() {
        // スタート
        this.dom.btnStart.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.soundPlayer.init();
            this.startPlay();
        });

        // 設定ボタン（トリプルタップ）
        this.dom.btnSetting.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.settingTapCount++;
            if (this.settingTapCount === 1) {
                this.settingTapTimer = setTimeout(() => {
                    this.settingTapCount = 0;
                }, 700);
            } else if (this.settingTapCount === 3) {
                clearTimeout(this.settingTapTimer);
                this.settingTapCount = 0;
                this.openSetting();
            }
        });

        // 履歴ボタン（トリプルタップ）
        const btnHistory = document.getElementById('btn-history');
        if (btnHistory) {
            let histTapCount = 0;
            let histTapTimer = null;
            btnHistory.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                histTapCount++;
                if (histTapCount === 1) {
                    histTapTimer = setTimeout(() => {
                        histTapCount = 0;
                    }, 700);
                } else if (histTapCount === 3) {
                    clearTimeout(histTapTimer);
                    histTapCount = 0;
                    this.openHistoryModal();
                }
            });
        }

        const btnCloseHistory = document.getElementById('btn-close-history');
        if (btnCloseHistory) {
            btnCloseHistory.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                document.getElementById('history-modal').classList.add('hidden');
            });
        }

        const btnClearHistory = document.getElementById('btn-clear-history');
        if (btnClearHistory) {
            btnClearHistory.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (confirm('履歴をすべて消去しますか？')) {
                    localStorage.removeItem('bunkatsu_puzzle_history');
                    this.renderHistoryUI();
                }
            });
        }

        // 戻るボタン
        this.dom.btnBackHome.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            // プレイ途中で戻る場合も、1問以上解いていれば履歴に中断記録として保存
            if (this.numOfClear > 0 && !this.clear) {
                this.saveHistory(false);
            }
            this.destroyPuzzle();
            this.showScreen('home');
        });

        // 画面リサイズ時にサンプルビューの比率と配置を再同期
        window.addEventListener('resize', () => {
            if (this.dom.settingScreen.classList.contains('active')) {
                this.updateSampleView();
            }
        });

        // 次へボタン
        this.dom.btnNext.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.dom.nextOverlay.classList.add('hidden');
            this.destroyPuzzle();
            this.shuffleImages();
            this.loadCurrentPuzzle();
        });

        // グローバルなポインターキャンセル・解放のセーフティネット（ピースの操作不能バグを防止）
        window.addEventListener('pointerup', (e) => {
            if (this.activePointers && this.activePointers.has(e.pointerId)) {
                this.endPointerSession(e.pointerId);
            }
        });
        window.addEventListener('pointercancel', (e) => {
            if (this.activePointers && this.activePointers.has(e.pointerId)) {
                this.endPointerSession(e.pointerId);
            }
        });

        // スライダー連動（サンプルビュー即時更新）
        this.dom.sliderRows.addEventListener('input', () => {
            this.dom.labelRows.textContent = this.dom.sliderRows.value;
            this.updateSampleView();
        });
        this.dom.sliderCols.addEventListener('input', () => {
            this.dom.labelCols.textContent = this.dom.sliderCols.value;
            this.updateSampleView();
        });
        this.dom.sliderQuestions.addEventListener('input', () => {
            this.dom.labelQuestions.textContent = this.dom.sliderQuestions.value;
        });
        this.dom.toggleRotation.addEventListener('change', () => {
            this.updateSampleView();
        });
        this.dom.toggleBackBtn.addEventListener('change', () => {
            if (this.dom.previewBtnBack) {
                this.dom.previewBtnBack.classList.toggle('hidden', !this.dom.toggleBackBtn.checked);
            }
        });

        // 完了ボタン
        this.dom.btnDone.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.row = parseInt(this.dom.sliderRows.value, 10);
            this.column = parseInt(this.dom.sliderCols.value, 10);
            this.questions = parseInt(this.dom.sliderQuestions.value, 10);
            this.allowRotation = this.dom.toggleRotation.checked;
            this.showBackButton = this.dom.toggleBackBtn.checked;
            this.liveSnap = this.dom.toggleLiveSnap.checked;

            localStorage.setItem('puzzle_row', this.row);
            localStorage.setItem('puzzle_col', this.column);
            localStorage.setItem('puzzle_questions', this.questions);
            localStorage.setItem('puzzle_allow_rotation', this.allowRotation);
            localStorage.setItem('puzzle_show_back_btn', this.showBackButton);
            localStorage.setItem('puzzle_live_snap', this.liveSnap);

            this.showScreen('home');
        });

        // 写真追加
        this.dom.fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // 写真一括削除
        this.dom.btnClearCustom.addEventListener('pointerdown', async (e) => {
            e.preventDefault();
            if (confirm('追加した写真をすべて削除しますか？')) {
                await this.db.clearCustom();
                await this.loadImagesFromDB();
                this.updateSampleView();
            }
        });

        // 写真リセット
        this.dom.btnResetPresets.addEventListener('pointerdown', async (e) => {
            e.preventDefault();
            if (confirm('サンプル写真の状態に戻しますか？')) {
                await this.db.clearAll();
                this.images = this.getDefaultPresets();
                for (const p of this.images) {
                    await this.db.add(p);
                }
                this.renderPhotoList();
                this.updateSampleView();
            }
        });
    }

    showScreen(name) {
        this.dom.homeScreen.classList.remove('active');
        this.dom.playScreen.classList.remove('active');
        this.dom.settingScreen.classList.remove('active');

        if (name === 'home') this.dom.homeScreen.classList.add('active');
        if (name === 'play') this.dom.playScreen.classList.add('active');
        if (name === 'setting') this.dom.settingScreen.classList.add('active');
    }

    openSetting() {
        this.syncSettingInputs();
        this.showScreen('setting');
        requestAnimationFrame(() => {
            this.updateSampleView();
        });
    }

    syncSettingInputs() {
        this.dom.sliderRows.value = this.row;
        this.dom.labelRows.textContent = this.row;
        this.dom.sliderCols.value = this.column;
        this.dom.labelCols.textContent = this.column;
        this.dom.sliderQuestions.value = this.questions;
        this.dom.labelQuestions.textContent = this.questions;
        this.dom.toggleRotation.checked = this.allowRotation;
        this.dom.toggleBackBtn.checked = this.showBackButton;
        this.dom.toggleLiveSnap.checked = this.liveSnap;
    }

    // --- 写真データ管理 ---
    async loadImagesFromDB() {
        const saved = await this.db.getAll();
        if (saved && saved.length > 0) {
            this.images = saved;
        } else {
            this.images = this.getDefaultPresets();
            for (const p of this.images) {
                await this.db.add(p);
            }
        }
        this.renderPhotoList();
    }

    async handleFileUpload(files) {
        if (!files || files.length === 0) return;
        for (const file of files) {
            const dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
            const item = {
                id: 'custom_' + Math.random().toString(36).substr(2, 9),
                name: file.name.replace(/\.[^/.]+$/, ""),
                url: dataUrl,
                isPreset: false
            };
            await this.db.add(item);
            this.images.push(item);
        }
        this.dom.fileInput.value = '';
        this.renderPhotoList();
        this.updateSampleView();
    }

    renderPhotoList() {
        this.dom.photoList.innerHTML = '';
        this.images.forEach(img => {
            const row = document.createElement('div');
            row.className = 'photo-row';

            const thumb = document.createElement('img');
            thumb.className = 'photo-thumb';
            thumb.src = img.url;

            const name = document.createElement('span');
            name.className = 'photo-name';
            name.textContent = img.name;

            const delBtn = document.createElement('button');
            delBtn.className = 'btn-delete-photo';
            delBtn.innerHTML = '✕';
            delBtn.title = '削除';
            delBtn.addEventListener('pointerdown', async (e) => {
                e.preventDefault();
                await this.db.delete(img.id);
                this.images = this.images.filter(i => i.id !== img.id);
                if (this.images.length === 0) {
                    this.images = this.getDefaultPresets();
                }
                this.renderPhotoList();
                this.updateSampleView();
            });

            row.appendChild(thumb);
            row.appendChild(name);
            row.appendChild(delBtn);
            this.dom.photoList.appendChild(row);
        });
    }

    shuffleImages() {
        for (let i = this.images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
        }
    }

    // --- サンプルビュー（プレイ画面を忠実に再現したリアルタイムプレビュー） ---
    updateSampleView() {
        const stage = this.dom.previewStage;
        const box = this.dom.previewBox;
        if (!stage || !box) return;
        stage.innerHTML = '';

        // プレイ画面（画面表示領域全体）と同じ縦横比を動的に維持
        const vpW = window.innerWidth || 1024;
        const vpH = window.innerHeight || 768;
        box.style.aspectRatio = `${vpW} / ${vpH}`;

        const rows = parseInt(this.dom.sliderRows.value, 10);
        const cols = parseInt(this.dom.sliderCols.value, 10);
        const allowRot = this.dom.toggleRotation.checked;
        const showBack = this.dom.toggleBackBtn.checked;

        if (this.dom.previewBtnBack) {
            this.dom.previewBtnBack.classList.toggle('hidden', !showBack);
        }

        if (this.images.length === 0) return;
        const sampleData = this.images[0];

        const img = new Image();
        img.onload = () => {
            const stageW = stage.clientWidth || 320;
            const stageH = stage.clientHeight || 240;

            const naturalW = img.naturalWidth || 800;
            const naturalH = img.naturalHeight || 800;

            // プレイ画面の上部UI領域（戻るボタン・クリア数）を考慮した配置可能エリア
            const topHeaderPad = showBack ? Math.max(28, Math.round(stageH * 0.16)) : 8;
            const availW = Math.max(60, stageW - 16);
            const availH = Math.max(60, stageH - topHeaderPad - 12);

            const isSmallSplit = (rows * cols) <= 4;
            const puzzleScale = isSmallSplit ? 0.46 : 0.675;
            let pWidth = availW * puzzleScale;
            let pHeight = (pWidth * naturalH) / naturalW;
            if (pHeight > availH * puzzleScale) {
                pHeight = availH * puzzleScale;
                pWidth = (pHeight * naturalW) / naturalH;
            }

            let pieceW = Math.max(1, Math.floor(pWidth / cols));
            let pieceH = Math.max(1, Math.floor(pHeight / rows));

            // 回転時にピースが枠を絶対にはみ出さないよう、最大寸法に対して安全スケールを適用
            const maxPieceVisW = allowRot ? Math.max(pieceW, pieceH) : pieceW;
            const maxPieceVisH = allowRot ? Math.max(pieceW, pieceH) : pieceH;
            let scaleDown = 1;
            if (maxPieceVisW > availW * 0.95) {
                scaleDown = Math.min(scaleDown, (availW * 0.95) / maxPieceVisW);
            }
            if (maxPieceVisH > availH * 0.95) {
                scaleDown = Math.min(scaleDown, (availH * 0.95) / maxPieceVisH);
            }
            if (scaleDown < 1) {
                pieceW = Math.max(1, Math.floor(pieceW * scaleDown));
                pieceH = Math.max(1, Math.floor(pieceH * scaleDown));
            }

            const srcPieceW = naturalW / cols;
            const srcPieceH = naturalH / rows;

            const previewPieces = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const pCanvas = document.createElement('canvas');
                    pCanvas.width = pieceW;
                    pCanvas.height = pieceH;
                    const pCtx = pCanvas.getContext('2d');
                    pCtx.drawImage(
                        img,
                        c * srcPieceW, r * srcPieceH, srcPieceW, srcPieceH,
                        0, 0, pieceW, pieceH
                    );

                    const rot = allowRot ? ((r * 3 + c + 1) % 4) : 0;
                    const visW = (rot % 2 === 1) ? pieceH : pieceW;
                    const visH = (rot % 2 === 1) ? pieceW : pieceH;

                    // ピースが枠を絶対にはみ出さない安全な中心座標範囲
                    const margin = 4;
                    let minStageX = margin + visW / 2;
                    let maxStageX = stageW - margin - visW / 2;
                    if (maxStageX < minStageX) {
                        minStageX = maxStageX = stageW / 2;
                    }

                    let minStageY = topHeaderPad + visH / 2;
                    let maxStageY = stageH - margin - visH / 2;
                    if (maxStageY < minStageY) {
                        minStageY = maxStageY = (topHeaderPad + stageH) / 2;
                    }

                    // 4分割以下のときは、相方ピースが外側に入ってこられる余白（0.8ピース分）を確保（端で詰むのを防ぎつつ上下・左右の入れ替わりも許容）
                    const marginRatio = 0.8;
                    const leftExtra = (isSmallSplit && c > 0) ? pieceW * marginRatio : 0;
                    const rightExtra = (isSmallSplit && c < cols - 1) ? pieceW * marginRatio : 0;
                    const topExtra = (isSmallSplit && r > 0) ? pieceH * marginRatio : 0;
                    const bottomExtra = (isSmallSplit && r < rows - 1) ? pieceH * marginRatio : 0;

                    let effMinX = minStageX + leftExtra;
                    let effMaxX = maxStageX - rightExtra;
                    if (effMaxX < effMinX) {
                        const midX = (minStageX + leftExtra + maxStageX - rightExtra) / 2;
                        effMinX = Math.max(minStageX, Math.min(maxStageX, midX - 6));
                        effMaxX = Math.max(effMinX, Math.min(maxStageX, midX + 6));
                    }

                    let effMinY = minStageY + topExtra;
                    let effMaxY = maxStageY - bottomExtra;
                    if (effMaxY < effMinY) {
                        const midY = (minStageY + topExtra + maxStageY - bottomExtra) / 2;
                        effMinY = Math.max(minStageY, Math.min(maxStageY, midY - 6));
                        effMaxY = Math.max(effMinY, Math.min(maxStageY, midY + 6));
                    }

                    // ランダム候補を生成（重ならない位置へ自然に散らばらせる）
                    const candidates = [];
                    for (let k = 0; k < 60; k++) {
                        candidates.push({
                            stageX: effMinX + Math.random() * (effMaxX - effMinX),
                            stageY: effMinY + Math.random() * (effMaxY - effMinY)
                        });
                    }

                    let bestCand = candidates[0];
                    let minOverlap = Infinity;

                    for (const cand of candidates) {
                        let totalOverlap = 0;

                        for (const other of previewPieces) {
                            const dx = Math.abs(cand.stageX - other.stageX);
                            const dy = Math.abs(cand.stageY - other.stageY);
                            const reqX = (visW + other.visW) / 2 + 4;
                            const reqY = (visH + other.visH) / 2 + 4;

                            if (dx < reqX && dy < reqY) {
                                totalOverlap += (reqX - dx) * (reqY - dy);
                            }
                        }

                        if (totalOverlap === 0) {
                            bestCand = cand;
                            break;
                        }

                        if (totalOverlap < minOverlap) {
                            minOverlap = totalOverlap;
                            bestCand = cand;
                        }
                    }

                    // 厳格な境界クランプ（1ピクセルたりとも枠外にはみ出させない）
                    const clampedCenterX = Math.max(visW / 2 + margin, Math.min(stageW - visW / 2 - margin, bestCand.stageX));
                    const clampedCenterY = Math.max(visH / 2 + topHeaderPad, Math.min(stageH - visH / 2 - margin, bestCand.stageY));

                    previewPieces.push({
                        stageX: clampedCenterX,
                        stageY: clampedCenterY,
                        visW: visW,
                        visH: visH
                    });

                    const left = clampedCenterX - pieceW / 2;
                    const top = clampedCenterY - pieceH / 2;

                    const pieceElem = document.createElement('div');
                    pieceElem.className = 'preview-piece';
                    pieceElem.style.width = `${pieceW}px`;
                    pieceElem.style.height = `${pieceH}px`;
                    pieceElem.style.left = `${left}px`;
                    pieceElem.style.top = `${top}px`;
                    pieceElem.style.transform = `rotate(${rot * 90}deg)`;
                    pieceElem.appendChild(pCanvas);

                    stage.appendChild(pieceElem);
                }
            }
        };
        img.src = sampleData.url;
    }

    // --- ゲームプレイ ---
    destroyPuzzle() {
        if (this.dom.puzzleStage) {
            this.dom.puzzleStage.innerHTML = '';
        }
        this.pieces = [];
        this.activePointers.clear();
        this.currentImage = null;
        this.clear = false;
        if (this.dom.nextOverlay) {
            this.dom.nextOverlay.classList.add('hidden');
        }
    }

    startPlay() {
        this.destroyPuzzle();
        this.startTime = Date.now();
        this.currentQuestionStartTime = Date.now();
        this.questionLogs = [];
        this.numOfClear = 0;
        this.dom.clearCount.textContent = String(this.numOfClear);
        this.dom.nextOverlay.classList.add('hidden');

        // 戻るボタンの表示・非表示反映
        if (this.showBackButton) {
            this.dom.btnBackHome.classList.remove('hidden');
        } else {
            this.dom.btnBackHome.classList.add('hidden');
        }

        this.showScreen('play');

        // 確実にDOMレイアウト完了後にセットアップ（真っ白画面防止）
        requestAnimationFrame(() => {
            setTimeout(() => {
                this.shuffleImages();
                this.loadCurrentPuzzle();
            }, 50);
        });
    }

    loadCurrentPuzzle() {
        if (!this.images || this.images.length === 0) {
            this.images = this.getDefaultPresets();
        }

        const currentData = this.images[0];
        this.currentPhotoName = currentData.name || '写真';
        this.currentQuestionStartTime = Date.now();

        const img = new Image();
        img.onload = () => {
            this.currentImage = img;
            this.clear = false;
            this.setupPuzzle();
        };
        img.onerror = () => {
            console.error('Failed to load image:', currentData.url);
            if (this.images.length > 1) {
                this.images.shift();
                this.loadCurrentPuzzle();
            }
        };
        img.src = currentData.url;
    }

    setupPuzzle() {
        const stage = this.dom.puzzleStage;
        if (!stage || !this.currentImage) return;
        stage.innerHTML = '';
        this.pieces = [];
        this.activePointers.clear();
        this.maxZIndex = 10;

        // ステージサイズの確実な取得
        const stageWidth = stage.clientWidth || window.innerWidth;
        const stageHeight = stage.clientHeight || window.innerHeight;

        const naturalWidth = this.currentImage.naturalWidth || 800;
        const naturalHeight = this.currentImage.naturalHeight || 800;

        // 4分割以下のときは上下・左右の入れ替わりと0.8ピース余白が両立するよう少し小さめ（0.46）、5分割以上は0.675
        const isSmallSplit = (this.row * this.column) <= 4;
        const puzzleScale = isSmallSplit ? 0.46 : 0.675;
        let puzzleWidth = stageWidth * puzzleScale;
        let puzzleHeight = (puzzleWidth * naturalHeight) / naturalWidth;

        if (puzzleHeight > stageHeight * puzzleScale) {
            puzzleHeight = stageHeight * puzzleScale;
            puzzleWidth = (puzzleHeight * naturalWidth) / naturalHeight;
        }

        const pieceWidth = Math.floor(puzzleWidth / this.column);
        const pieceHeight = Math.floor(puzzleHeight / this.row);

        const srcPieceW = naturalWidth / this.column;
        const srcPieceH = naturalHeight / this.row;

        let pieceIndex = 0;
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.column; c++) {
                const offsetX = (((this.column - 1) / 2) - c) * -pieceWidth;
                const offsetY = (((this.row - 1) / 2) - r) * -pieceHeight;

                const pCanvas = document.createElement('canvas');
                pCanvas.width = pieceWidth;
                pCanvas.height = pieceHeight;
                pCanvas.className = 'puzzle-piece-canvas';
                const pCtx = pCanvas.getContext('2d');

                pCtx.drawImage(
                    this.currentImage,
                    c * srcPieceW, r * srcPieceH, srcPieceW, srcPieceH,
                    0, 0, pieceWidth, pieceHeight
                );

                // 画像の余白などでピースが真っ白（または透明）かどうかを判定
                const isBlank = this.isPieceBlank(pCtx, pieceWidth, pieceHeight);

                const randomRot = this.allowRotation ? Math.floor(Math.random() * 4) : 0;
                const visW = (randomRot % 2 === 1) ? pieceHeight : pieceWidth;
                const visH = (randomRot % 2 === 1) ? pieceWidth : pieceHeight;

                // ステージ内の安全な配置領域（UI要素との被り防止と端の余白）
                const padX = Math.max(16, visW / 2 + 12);
                const padY = Math.max(16, visH / 2 + 12);
                const minStageX = padX;
                const maxStageX = Math.max(minStageX + 20, stageWidth - padX);
                let minStageY = 65 + visH / 2; // もどるボタンやクリア回数のヘッダー領域を避ける
                let maxStageY = stageHeight - padY;
                if (maxStageY - minStageY < 60) {
                    minStageY = padY;
                    maxStageY = Math.max(minStageY + 20, stageHeight - padY);
                }

                // 4分割以下のときは、相方ピースが外側に入ってこられる余白（0.8ピース分）を確保（端で詰むのを防ぎつつ上下・左右の入れ替わりも許容）
                const marginRatio = 0.8;
                const leftExtra = (isSmallSplit && c > 0) ? pieceWidth * marginRatio : 0;
                const rightExtra = (isSmallSplit && c < this.column - 1) ? pieceWidth * marginRatio : 0;
                const topExtra = (isSmallSplit && r > 0) ? pieceHeight * marginRatio : 0;
                const bottomExtra = (isSmallSplit && r < this.row - 1) ? pieceHeight * marginRatio : 0;

                let effMinX = minStageX + leftExtra;
                let effMaxX = maxStageX - rightExtra;
                if (effMaxX < effMinX) {
                    const midX = (minStageX + leftExtra + maxStageX - rightExtra) / 2;
                    effMinX = Math.max(minStageX, Math.min(maxStageX, midX - 20));
                    effMaxX = Math.max(effMinX, Math.min(maxStageX, midX + 20));
                }

                let effMinY = minStageY + topExtra;
                let effMaxY = maxStageY - bottomExtra;
                if (effMaxY < effMinY) {
                    const midY = (minStageY + topExtra + maxStageY - bottomExtra) / 2;
                    effMinY = Math.max(minStageY, Math.min(maxStageY, midY - 20));
                    effMaxY = Math.max(effMinY, Math.min(maxStageY, midY + 20));
                }

                // ランダムな候補座標を生成（1ピース目から毎回異なるランダムな位置になり、かつ重なりを避ける）
                const candidates = [];
                for (let k = 0; k < 80; k++) {
                    candidates.push({
                        stageX: effMinX + Math.random() * (effMaxX - effMinX),
                        stageY: effMinY + Math.random() * (effMaxY - effMinY)
                    });
                }

                // 既存の配置済みピースとの重なり評価
                let bestCand = candidates[0];
                let minOverlap = Infinity;

                for (const cand of candidates) {
                    let totalOverlap = 0;

                    for (const other of this.pieces) {
                        const otherStageX = other.position.x + other.offset.width;
                        const otherStageY = other.position.y + other.offset.height;
                        const otherVisW = (other.rotation % 2 === 1) ? other.height : other.width;
                        const otherVisH = (other.rotation % 2 === 1) ? other.width : other.height;

                        const dx = Math.abs(cand.stageX - otherStageX);
                        const dy = Math.abs(cand.stageY - otherStageY);
                        const reqX = (visW + otherVisW) / 2 + 12;
                        const reqY = (visH + otherVisH) / 2 + 12;

                        if (dx < reqX && dy < reqY) {
                            totalOverlap += (reqX - dx) * (reqY - dy);
                        }

                        // 隣り合うピースが最初から正解位置のすぐ近くに配置されるのを防ぐ
                        if (Math.abs(r - other.row) + Math.abs(c - other.column) === 1) {
                            const candPosX = cand.stageX - offsetX;
                            const candPosY = cand.stageY - offsetY;
                            const pdx = candPosX - other.position.x;
                            const pdy = candPosY - other.position.y;
                            if (pdx * pdx + pdy * pdy < 10000) {
                                totalOverlap += 50000;
                            }
                        }
                    }

                    // 重なりゼロのランダム候補が見つかり次第それを採用（四隅への偏りをなくし自然なランダム配置を実現）
                    if (totalOverlap === 0) {
                        bestCand = cand;
                        break;
                    }

                    // すべて重なる場合は、重なり面積が最小の候補を選択
                    if (totalOverlap < minOverlap) {
                        minOverlap = totalOverlap;
                        bestCand = cand;
                    }
                }

                const position = {
                    x: bestCand.stageX - offsetX,
                    y: bestCand.stageY - offsetY
                };

                const piece = new Piece({
                    row: r,
                    column: c,
                    position: position,
                    offset: { width: offsetX, height: offsetY },
                    rotation: randomRot,
                    zIndex: 10,
                    canvas: pCanvas,
                    width: pieceWidth,
                    height: pieceHeight,
                    isBlank: isBlank
                });

                this.createPieceElement(piece, pieceIndex);
                this.pieces.push(piece);
                pieceIndex++;
            }
        }

        this.renderAllPieces();
    }

    // ピースが画像の余白等で真っ白（または透明）かどうかを判定
    isPieceBlank(ctx, width, height) {
        if (width <= 0 || height <= 0) return false;
        try {
            const imgData = ctx.getImageData(0, 0, width, height).data;
            const stepX = Math.max(1, Math.floor(width / 20));
            const stepY = Math.max(1, Math.floor(height / 20));
            const marginX = Math.min(2, Math.floor(width / 6));
            const marginY = Math.min(2, Math.floor(height / 6));

            let sampleCount = 0;
            let blankCount = 0;

            for (let y = marginY; y < height - marginY; y += stepY) {
                for (let x = marginX; x < width - marginX; x += stepX) {
                    const idx = (y * width + x) * 4;
                    const r = imgData[idx];
                    const g = imgData[idx + 1];
                    const b = imgData[idx + 2];
                    const a = imgData[idx + 3];
                    sampleCount++;
                    // 透明（a < 20）またはほぼ真っ白（RGBすべて245以上）
                    if (a < 20 || (r >= 245 && g >= 245 && b >= 245)) {
                        blankCount++;
                    }
                }
            }
            return sampleCount > 0 && (blankCount / sampleCount) >= 0.98;
        } catch (e) {
            return false;
        }
    }

    // 2つの白ピース間で画面上の見た目位置を維持したままグリッド上の割り当て（row, column, offset）を入れ替える
    swapBlankPieceSlots(p1, p2) {
        if (!p1 || !p2 || p1 === p2) return;
        const stageX1 = p1.position.x + p1.offset.width;
        const stageY1 = p1.position.y + p1.offset.height;
        const stageX2 = p2.position.x + p2.offset.width;
        const stageY2 = p2.position.y + p2.offset.height;

        const tmpRow = p1.row;
        const tmpCol = p1.column;
        const tmpOff = { ...p1.offset };

        p1.row = p2.row;
        p1.column = p2.column;
        p1.offset = { ...p2.offset };

        p2.row = tmpRow;
        p2.column = tmpCol;
        p2.offset = tmpOff;

        p1.position = { x: stageX1 - p1.offset.width, y: stageY1 - p1.offset.height };
        p1.startPosition = { ...p1.position };
        p2.position = { x: stageX2 - p2.offset.width, y: stageY2 - p2.offset.height };
        p2.startPosition = { ...p2.position };
    }

    createPieceElement(piece, index) {
        const div = document.createElement('div');
        div.className = 'puzzle-piece';
        div.style.width = `${piece.width}px`;
        div.style.height = `${piece.height}px`;
        div.appendChild(piece.canvas);

        piece.element = div;
        this.dom.puzzleStage.appendChild(div);

        this.bindPiecePointerEvents(div, index);
    }

    bringPieceToFront(pieceIndex) {
        const targetPiece = this.pieces[pieceIndex];
        if (!targetPiece) return;
        this.maxZIndex += 1;
        targetPiece.zIndex = this.maxZIndex;
        if (targetPiece.groupID) {
            this.pieces.forEach(p => {
                if (p.groupID === targetPiece.groupID) {
                    p.zIndex = this.maxZIndex;
                    if (p.element) p.element.style.zIndex = this.maxZIndex;
                }
            });
        } else {
            if (targetPiece.element) targetPiece.element.style.zIndex = this.maxZIndex;
        }
    }

    endPointerSession(pointerId) {
        const session = this.activePointers.get(pointerId);
        if (!session) return;
        this.activePointers.delete(pointerId);

        const targetPiece = this.pieces[session.pieceIndex];

        if (targetPiece && targetPiece.groupID) {
            this.pieces.forEach(p => {
                if (p.groupID === targetPiece.groupID && p.element) {
                    p.element.classList.remove('dragging');
                }
            });
        } else if (session.elem) {
            session.elem.classList.remove('dragging');
        }

        try { session.elem.releasePointerCapture(pointerId); } catch (err) {}

        if (!session.isDragging) {
            // タップ判定：回転のロックをはずした（回転OFFの）ときは回転しない！
            if (this.allowRotation && targetPiece) {
                if (targetPiece.groupID) {
                    targetPiece.rotation = 0;
                } else {
                    targetPiece.rotation = (targetPiece.rotation + 1) % 4;
                }
                this.renderAllPieces();
            }
        } else {
            // ドラッグ終了：吸着判定
            if (targetPiece) {
                this.checkSnap(session.pieceIndex, false);
                targetPiece.startPosition = { ...targetPiece.position };
                if (targetPiece.groupID) {
                    this.pieces.forEach(p => {
                        if (p.groupID === targetPiece.groupID) {
                            p.startPosition = { ...targetPiece.startPosition };
                        }
                    });
                }
                this.renderAllPieces();
            }
        }
    }

    bindPiecePointerEvents(elem, pieceIndex) {
        elem.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.soundPlayer.init();

            const targetPiece = this.pieces[pieceIndex];
            if (!targetPiece) return;

            // 既存のセッションがあればクリーンアップ
            if (this.activePointers.has(e.pointerId)) {
                this.activePointers.delete(e.pointerId);
            }

            // このピースまたは同じグループが別の有効な指で操作中かチェック
            for (const [pId, sess] of this.activePointers.entries()) {
                const sessPiece = this.pieces[sess.pieceIndex];
                if (!sessPiece) {
                    this.activePointers.delete(pId);
                    continue;
                }
                if (sess.pieceIndex === pieceIndex ||
                    (targetPiece.groupID && sessPiece.groupID && targetPiece.groupID === sessPiece.groupID)) {
                    return;
                }
            }

            // 最前面化（タッチした瞬間に最前面へ）
            this.bringPieceToFront(pieceIndex);

            try { elem.setPointerCapture(e.pointerId); } catch (err) {}

            this.activePointers.set(e.pointerId, {
                pieceIndex: pieceIndex,
                elem: elem,
                startX: e.clientX,
                startY: e.clientY,
                pieceStartPos: { ...targetPiece.position },
                isDragging: false
            });
        });

        elem.addEventListener('pointermove', (e) => {
            const session = this.activePointers.get(e.pointerId);
            if (!session) return;
            e.preventDefault();

            const dx = e.clientX - session.startX;
            const dy = e.clientY - session.startY;

            const targetPiece = this.pieces[session.pieceIndex];
            if (!targetPiece) return;

            if (!session.isDragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
                session.isDragging = true;
                if (targetPiece.groupID) {
                    this.pieces.forEach(p => {
                        if (p.groupID === targetPiece.groupID && p.element) {
                            p.element.classList.add('dragging');
                        }
                    });
                } else {
                    elem.classList.add('dragging');
                }
                // ドラッグ開始時にも確実に最前面へ
                this.bringPieceToFront(session.pieceIndex);
            }

            if (session.isDragging) {
                // ドラッグ中のピースが他ピースより背面にあれば最前面化
                if (targetPiece.zIndex < this.maxZIndex) {
                    this.bringPieceToFront(session.pieceIndex);
                }

                const stageW = this.dom.puzzleStage.clientWidth || window.innerWidth;
                const stageH = this.dom.puzzleStage.clientHeight || window.innerHeight;

                // 画面外への飛び出し防止（ピースの一部が必ず画面内に残る・端付近でも吸着できるよう0.25）
                const clampMarginX = targetPiece.width * 0.25;
                const clampMarginY = targetPiece.height * 0.25;
                const minPosX = clampMarginX - targetPiece.offset.width;
                const maxPosX = stageW - clampMarginX - targetPiece.offset.width;
                const minPosY = clampMarginY - targetPiece.offset.height;
                const maxPosY = stageH - clampMarginY - targetPiece.offset.height;

                const clampedX = Math.max(minPosX, Math.min(maxPosX, session.pieceStartPos.x + dx));
                const clampedY = Math.max(minPosY, Math.min(maxPosY, session.pieceStartPos.y + dy));

                const newPos = { x: clampedX, y: clampedY };
                targetPiece.position = newPos;

                if (targetPiece.groupID) {
                    this.pieces.forEach(p => {
                        if (p.groupID === targetPiece.groupID) {
                            p.position = { ...newPos };
                        }
                    });
                }
                this.renderAllPieces();

                // ドラッグ中の吸着判定（設定がONの場合）
                if (this.liveSnap && !this.clear) {
                    const snapped = this.checkSnap(session.pieceIndex, true);
                    if (snapped) {
                        session.startX = e.clientX;
                        session.startY = e.clientY;
                        session.pieceStartPos = { ...targetPiece.position };
                        if (targetPiece.groupID) {
                            this.pieces.forEach(p => {
                                if (p.groupID === targetPiece.groupID && p.element) {
                                    p.element.classList.add('dragging');
                                }
                            });
                        }
                        this.renderAllPieces();
                        if (this.clear) {
                            this.endPointerSession(e.pointerId);
                        }
                    }
                }
            }
        });

        elem.addEventListener('pointerup', (e) => this.endPointerSession(e.pointerId));
        elem.addEventListener('pointercancel', (e) => this.endPointerSession(e.pointerId));
        elem.addEventListener('lostpointercapture', (e) => this.endPointerSession(e.pointerId));
    }

    renderAllPieces() {
        this.pieces.forEach(piece => {
            if (!piece.element) return;
            const left = piece.position.x + piece.offset.width - piece.width / 2;
            const top = piece.position.y + piece.offset.height - piece.height / 2;
            const deg = piece.rotation * 90;

            piece.element.style.left = `${left}px`;
            piece.element.style.top = `${top}px`;
            piece.element.style.transform = `rotate(${deg}deg)`;
            piece.element.style.zIndex = piece.zIndex;
        });
    }

    // --- 吸着判定 ---
    checkSnap(offset, isLive = false) {
        const piece = this.pieces[offset];
        // 白ピース（isBlank）はどの回転向きでも吸着可能とする
        if (!piece || (piece.rotation !== 0 && !piece.isBlank)) return false;

        // 通常ドロップ時は判定半径50px (2500)、ドラッグ吸着時は1.5倍の判定半径75px (5625)
        const isLiveSnapMode = isLive || this.liveSnap;
        const snapRadius = isLiveSnapMode ? 75 : 50;
        const snapThreshold = snapRadius * snapRadius;
        let anyConnected = false;

        let loopCount = 0;
        while (loopCount < 10) {
            loopCount++;
            let connectedInLoop = false;

            // 未結合の白ピース一覧（どの白ピースの位置・スロットとも相互に入れ替え可能）
            const freeBlanks = this.pieces.filter(p => p.isBlank && !p.groupID);

            // 1. 操作中のピース自身が未結合の白ピースの場合：隣接できる最適な白ピーススロットを探索
            if (piece.isBlank && !piece.groupID) {
                const pieceStageX = piece.position.x + piece.offset.width;
                const pieceStageY = piece.position.y + piece.offset.height;
                let bestDistSq = snapThreshold;
                let bestMatch = null;

                for (const other of this.pieces) {
                    if (other === piece) continue;
                    const otherIsFreeBlank = other.isBlank && !other.groupID;
                    if (other.rotation !== 0 && !otherIsFreeBlank) continue;

                    if (!otherIsFreeBlank) {
                        for (const slotA of freeBlanks) {
                            if (Math.abs(slotA.row - other.row) + Math.abs(slotA.column - other.column) === 1) {
                                const candX = pieceStageX - slotA.offset.width;
                                const candY = pieceStageY - slotA.offset.height;
                                const dx = candX - other.position.x;
                                const dy = candY - other.position.y;
                                const dSq = dx * dx + dy * dy;
                                if (dSq < bestDistSq) {
                                    bestDistSq = dSq;
                                    bestMatch = {
                                        targetRowA: slotA.row,
                                        targetColA: slotA.column,
                                        other: null
                                    };
                                }
                            }
                        }
                    } else {
                        const otherStageX = other.position.x + other.offset.width;
                        const otherStageY = other.position.y + other.offset.height;
                        for (const slotA of freeBlanks) {
                            for (const slotB of freeBlanks) {
                                if (slotA === slotB) continue;
                                if (Math.abs(slotA.row - slotB.row) + Math.abs(slotA.column - slotB.column) === 1) {
                                    const candX = pieceStageX - slotA.offset.width;
                                    const candY = pieceStageY - slotA.offset.height;
                                    const otherCandX = otherStageX - slotB.offset.width;
                                    const otherCandY = otherStageY - slotB.offset.height;
                                    const dx = candX - otherCandX;
                                    const dy = candY - otherCandY;
                                    const dSq = dx * dx + dy * dy;
                                    if (dSq < bestDistSq) {
                                        bestDistSq = dSq;
                                        bestMatch = {
                                            targetRowA: slotA.row,
                                            targetColA: slotA.column,
                                            other: other,
                                            targetRowB: slotB.row,
                                            targetColB: slotB.column
                                        };
                                    }
                                }
                            }
                        }
                    }
                }

                if (bestMatch) {
                    const holderA = freeBlanks.find(p => p.row === bestMatch.targetRowA && p.column === bestMatch.targetColA);
                    if (holderA) this.swapBlankPieceSlots(piece, holderA);
                    piece.rotation = 0;

                    if (bestMatch.other) {
                        const holderB = freeBlanks.find(p => p.row === bestMatch.targetRowB && p.column === bestMatch.targetColB);
                        if (holderB) this.swapBlankPieceSlots(bestMatch.other, holderB);
                        bestMatch.other.rotation = 0;
                    }
                }
            }

            // 回転が0でない場合（吸着対象が見つからなかった回転状態の白ピースなど）は終了
            if (piece.rotation !== 0) break;

            // 2. 周囲にある未結合の白ピースが、操作中のピース（またはグループ）に吸着できる場合のスロット入れ替え＆回転リセット
            if (freeBlanks.length > 0) {
                const groupA = piece.groupID ? this.pieces.filter(p => p.groupID === piece.groupID) : [piece];
                for (const otherBlank of freeBlanks) {
                    if (otherBlank === piece || groupA.includes(otherBlank)) continue;
                    const otherStageX = otherBlank.position.x + otherBlank.offset.width;
                    const otherStageY = otherBlank.position.y + otherBlank.offset.height;
                    let bestDistSq = snapThreshold;
                    let bestTargetSlot = null;

                    for (const slotHolder of freeBlanks) {
                        const isAdj = groupA.some(pA => Math.abs(slotHolder.row - pA.row) + Math.abs(slotHolder.column - pA.column) === 1);
                        if (!isAdj) continue;
                        const candX = otherStageX - slotHolder.offset.width;
                        const candY = otherStageY - slotHolder.offset.height;
                        const dx = candX - piece.position.x;
                        const dy = candY - piece.position.y;
                        const dSq = dx * dx + dy * dy;
                        if (dSq < bestDistSq) {
                            bestDistSq = dSq;
                            bestTargetSlot = { row: slotHolder.row, col: slotHolder.column };
                        }
                    }

                    if (bestTargetSlot) {
                        const holder = freeBlanks.find(p => p.row === bestTargetSlot.row && p.column === bestTargetSlot.col);
                        if (holder) this.swapBlankPieceSlots(otherBlank, holder);
                        otherBlank.rotation = 0;
                    }
                }
            }

            const position = piece.position;
            const activeGroup = piece.groupID ? this.pieces.filter(p => p.groupID === piece.groupID) : [piece];

            const distances = this.pieces.map((other, idx) => {
                if (idx === offset) return 999999999;
                if (other.rotation !== 0) return 999999999;
                if (piece.groupID && other.groupID && piece.groupID === other.groupID) {
                    return 999999999;
                }
                const otherGroup = other.groupID ? this.pieces.filter(p => p.groupID === other.groupID) : [other];
                const isAdjacent = activeGroup.some(pA =>
                    otherGroup.some(pB => Math.abs(pA.row - pB.row) + Math.abs(pA.column - pB.column) === 1)
                );
                if (!isAdjacent) return 999999999;

                const dx = position.x - other.position.x;
                const dy = position.y - other.position.y;
                return dx * dx + dy * dy;
            });

            const minDistance = Math.min(...distances);
            const nearestIndex = distances.indexOf(minDistance);

            if (minDistance < snapThreshold && this.pieces[nearestIndex].rotation === 0) {
                const nearestPiece = this.pieces[nearestIndex];

                if (piece.groupID) {
                    const groupA = this.pieces.filter(p => p.groupID === piece.groupID);
                    if (nearestPiece.groupID) {
                        const groupB = this.pieces.filter(p => p.groupID === nearestPiece.groupID);
                        let connected = false;
                        for (const pA of groupA) {
                            for (const pB of groupB) {
                                if (Math.abs(pA.row - pB.row) + Math.abs(pA.column - pB.column) === 1) {
                                    const targetGID = nearestPiece.groupID;
                                    const targetPos = { ...nearestPiece.position };
                                    groupA.forEach(p => {
                                        p.position = { ...targetPos };
                                        p.startPosition = { ...targetPos };
                                        p.groupID = targetGID;
                                    });
                                    connected = true;
                                    break;
                                }
                            }
                            if (connected) break;
                        }
                        if (connected) { connectedInLoop = true; anyConnected = true; }
                    } else {
                        let connected = false;
                        for (const pA of groupA) {
                            if (Math.abs(pA.row - nearestPiece.row) + Math.abs(pA.column - nearestPiece.column) === 1) {
                                nearestPiece.position = { ...piece.position };
                                nearestPiece.startPosition = { ...piece.position };
                                nearestPiece.groupID = piece.groupID;
                                connected = true;
                                break;
                            }
                        }
                        if (connected) { connectedInLoop = true; anyConnected = true; }
                    }
                } else {
                    if (nearestPiece.groupID) {
                        const groupB = this.pieces.filter(p => p.groupID === nearestPiece.groupID);
                        let connected = false;
                        for (const pB of groupB) {
                            if (Math.abs(piece.row - pB.row) + Math.abs(piece.column - pB.column) === 1) {
                                piece.position = { ...nearestPiece.position };
                                piece.startPosition = { ...nearestPiece.position };
                                piece.groupID = nearestPiece.groupID;
                                connected = true;
                                break;
                            }
                        }
                        if (connected) { connectedInLoop = true; anyConnected = true; }
                    } else {
                        if (Math.abs(piece.row - nearestPiece.row) + Math.abs(piece.column - nearestPiece.column) === 1) {
                            const newGID = 'grp_' + Math.random().toString(36).substr(2, 9);
                            piece.position = { ...nearestPiece.position };
                            piece.startPosition = { ...nearestPiece.position };
                            piece.groupID = newGID;
                            nearestPiece.groupID = newGID;
                            connectedInLoop = true;
                            anyConnected = true;
                        }
                    }
                }
            }
            if (!connectedInLoop) break;
        }

        if (anyConnected) {
            this.soundPlayer.playTik();
            this.bringPieceToFront(offset);
            this.renderAllPieces();
        }

        // クリア判定
        if (!this.clear && piece.groupID) {
            const allSame = this.pieces.every(p => p.groupID && p.groupID === piece.groupID);
            if (allSame) {
                this.clear = true;
                this.numOfClear++;
                this.soundPlayer.playPinpon();
                this.dom.clearCount.textContent = String(this.numOfClear);

                const qDur = Math.max(1, Math.round((Date.now() - (this.currentQuestionStartTime || this.startTime)) / 1000));
                this.questionLogs.push({
                    index: this.numOfClear,
                    photoName: this.currentPhotoName || `第${this.numOfClear}問`,
                    duration: qDur
                });

                if (this.numOfClear >= this.questions) {
                    this.saveHistory(true);
                    setTimeout(() => {
                        this.destroyPuzzle();
                        this.showScreen('home');
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.dom.nextOverlay.classList.remove('hidden');
                    }, 400);
                }
            }
        }

        return anyConnected;
    }

    formatDuration(sec) {
        if (!sec || sec <= 0) return '0秒';
        if (sec < 60) return `${sec}秒`;
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}分${s}秒`;
    }

    saveHistory(completed = true) {
        try {
            const now = new Date();
            const dateStr = now.toLocaleString('ja-JP', {
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            const totalDur = this.startTime ? Math.max(1, Math.round((Date.now() - this.startTime) / 1000)) : 0;
            const avgDur = this.numOfClear > 0 ? (totalDur / this.numOfClear).toFixed(1) : '0';

            const item = {
                date: dateStr,
                total: this.questions,
                cleared: this.numOfClear,
                completed: completed,
                rows: this.row,
                cols: this.column,
                piecesCount: this.row * this.column,
                rotation: this.allowRotation,
                liveSnap: this.liveSnap,
                duration: totalDur,
                avgDuration: avgDur,
                questions: [...(this.questionLogs || [])]
            };
            const list = JSON.parse(localStorage.getItem('bunkatsu_puzzle_history') || '[]');
            list.unshift(item);
            if (list.length > 100) list.pop();
            localStorage.setItem('bunkatsu_puzzle_history', JSON.stringify(list));
        } catch (e) {
            console.warn('Failed to save history', e);
        }
    }

    openHistoryModal() {
        this.renderHistoryUI();
        document.getElementById('history-modal').classList.remove('hidden');
    }

    renderHistoryUI() {
        const listEl = document.getElementById('history-modal-list');
        if (!listEl) return;
        listEl.innerHTML = '';

        let list = [];
        try {
            list = JSON.parse(localStorage.getItem('bunkatsu_puzzle_history') || '[]');
        } catch (e) {}

        if (list.length === 0) {
            listEl.innerHTML = '<div style="text-align:center; padding: 40px; color:#8e8e93; font-weight:700;">履歴はありません</div>';
            return;
        }

        list.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card-item';

            const isCompleted = item.completed !== false && item.cleared >= item.total;
            const badgeClass = isCompleted ? 'success' : 'partial';
            const badgeText = isCompleted ? `${item.cleared}/${item.total}問 クリア` : `${item.cleared}/${item.total}問 (中断)`;

            const rotText = item.rotation ? '🔄 回転あり' : '🔄 回転なし';
            const snapText = item.liveSnap ? '🧲 ドラッグ吸着' : '🧲 ドロップ吸着';
            const timeText = `⏱️ ${this.formatDuration(item.duration)}`;
            const pieces = item.piecesCount || (item.rows * item.cols);
            const splitText = `🧩 ${item.rows}×${item.cols} (${pieces}ピース)`;

            let qListHTML = '';
            if (item.questions && item.questions.length > 0) {
                qListHTML = `
                    <div class="history-q-section-title">設問ごとの記録</div>
                    <div class="history-q-list">
                        ${item.questions.map(q => `
                            <div class="history-q-row">
                                <span class="history-q-idx">第${q.index}問</span>
                                <span class="history-q-name">${q.photoName || '写真'}</span>
                                <span class="history-q-time">${this.formatDuration(q.duration)}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                qListHTML = `<div style="color:#94a3b8; font-size:0.75rem; text-align:center; padding:4px 0;">設問詳細ログはありません</div>`;
            }

            const avgSec = item.avgDuration ? `約${item.avgDuration}秒 / 問` : (item.duration && item.cleared ? `約${Math.round(item.duration / item.cleared)}秒 / 問` : '-');

            card.innerHTML = `
                <div class="history-card-header">
                    <div class="history-card-top">
                        <span class="history-card-date">${item.date || ''}</span>
                        <span class="history-badge ${badgeClass}">${badgeText}</span>
                    </div>
                    <div class="history-card-tags">
                        <span class="history-tag">${splitText}</span>
                        <span class="history-tag">${rotText}</span>
                        <span class="history-tag">${snapText}</span>
                        <span class="history-tag time">${timeText}</span>
                    </div>
                    <div class="history-card-toggle">詳細 <span>▼</span></div>
                </div>
                <div class="history-card-details">
                    <div class="history-stats-grid">
                        <div class="history-stat-item">
                            <span class="history-stat-label">クリア達成</span>
                            <span class="history-stat-val">${item.cleared} / ${item.total}問</span>
                        </div>
                        <div class="history-stat-item">
                            <span class="history-stat-label">総所要時間</span>
                            <span class="history-stat-val">${this.formatDuration(item.duration)}</span>
                        </div>
                        <div class="history-stat-item">
                            <span class="history-stat-label">平均解答時間</span>
                            <span class="history-stat-val">${avgSec}</span>
                        </div>
                        <div class="history-stat-item">
                            <span class="history-stat-label">ピース数</span>
                            <span class="history-stat-val">${pieces}ピース (${item.rows}×${item.cols})</span>
                        </div>
                    </div>
                    ${qListHTML}
                </div>
            `;

            const headerEl = card.querySelector('.history-card-header');
            headerEl.addEventListener('click', (e) => {
                e.preventDefault();
                card.classList.toggle('expanded');
            });

            listEl.appendChild(card);
        });
    }
}

// 起動
window.addEventListener('DOMContentLoaded', () => {
    new PhotoPuzzleApp();
});
