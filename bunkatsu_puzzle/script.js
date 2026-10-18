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

        // 状態
        this.numOfClear = 0;
        this.clear = false;
        this.pieces = [];
        this.images = this.getDefaultPresets(); // 初期状態から即時使用可能にしておく
        this.currentImage = null;
        // マルチタッチ・複数同時ドラッグ管理 (pointerId => session)
        this.activePointers = new Map();

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
            previewStage: document.getElementById('preview-stage'),
            previewBtnBack: document.getElementById('preview-btn-back'),

            sliderQuestions: document.getElementById('slider-questions'),
            labelQuestions: document.getElementById('label-questions'),
            toggleRotation: document.getElementById('toggle-rotation'),
            toggleBackBtn: document.getElementById('toggle-back-btn'),

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

        // 戻るボタン
        this.dom.btnBackHome.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.showScreen('home');
        });

        // 次へボタン
        this.dom.btnNext.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.dom.nextOverlay.classList.add('hidden');
            this.shuffleImages();
            this.loadCurrentPuzzle();
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

            localStorage.setItem('puzzle_row', this.row);
            localStorage.setItem('puzzle_col', this.column);
            localStorage.setItem('puzzle_questions', this.questions);
            localStorage.setItem('puzzle_allow_rotation', this.allowRotation);
            localStorage.setItem('puzzle_show_back_btn', this.showBackButton);

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
        if (!stage) return;
        stage.innerHTML = '';

        const rows = parseInt(this.dom.sliderRows.value, 10);
        const cols = parseInt(this.dom.sliderCols.value, 10);
        const allowRot = this.dom.toggleRotation.checked;

        if (this.dom.previewBtnBack) {
            this.dom.previewBtnBack.classList.toggle('hidden', !this.dom.toggleBackBtn.checked);
        }

        if (this.images.length === 0) return;
        const sampleData = this.images[0];

        const img = new Image();
        img.onload = () => {
            const stageW = stage.clientWidth || 360;
            const stageH = stage.clientHeight || 270;

            const naturalW = img.naturalWidth || 800;
            const naturalH = img.naturalHeight || 800;

            let pWidth = stageW * 0.72;
            let pHeight = (pWidth * naturalH) / naturalW;
            if (pHeight > stageH * 0.72) {
                pHeight = stageH * 0.72;
                pWidth = (pHeight * naturalW) / naturalH;
            }

            const pieceW = Math.floor(pWidth / cols);
            const pieceH = Math.floor(pHeight / rows);
            const srcPieceW = naturalW / cols;
            const srcPieceH = naturalH / rows;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const offsetX = (((cols - 1) / 2) - c) * -pieceW;
                    const offsetY = (((rows - 1) / 2) - r) * -pieceH;

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

                    // プレビュー用に散らばり配置（決定論的配置でプレビューが安定）
                    const minX = pieceW / 2 - offsetX;
                    const maxX = Math.max(minX + 10, stageW - pieceW / 2 - offsetX);
                    const minY = pieceH / 2 - offsetY;
                    const maxY = Math.max(minY + 10, stageH - pieceH / 2 - offsetY);

                    const ratioX = ((c * 17 + r * 31) % 100) / 100;
                    const ratioY = ((r * 23 + c * 47) % 100) / 100;
                    const posX = minX + ratioX * (maxX - minX);
                    const posY = minY + ratioY * (maxY - minY);

                    const left = posX + offsetX - pieceW / 2;
                    const top = posY + offsetY - pieceH / 2;

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
    startPlay() {
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
        if (!stage) return;
        stage.innerHTML = '';
        this.pieces = [];

        // ステージサイズの確実な取得
        const stageWidth = stage.clientWidth || window.innerWidth;
        const stageHeight = stage.clientHeight || window.innerHeight;

        const naturalWidth = this.currentImage.naturalWidth || 800;
        const naturalHeight = this.currentImage.naturalHeight || 800;

        let puzzleWidth = stageWidth * 0.75;
        let puzzleHeight = (puzzleWidth * naturalHeight) / naturalWidth;

        if (puzzleHeight > stageHeight * 0.75) {
            puzzleHeight = stageHeight * 0.75;
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

                const randomRot = this.allowRotation ? Math.floor(Math.random() * 4) : 0;

                const minX = pieceWidth / 2 - offsetX;
                const maxX = Math.max(minX + 10, stageWidth - pieceWidth / 2 - offsetX);
                const minY = pieceHeight / 2 - offsetY;
                const maxY = Math.max(minY + 10, stageHeight - pieceHeight / 2 - offsetY);

                let position = { x: 0, y: 0 };
                let success = false;

                for (let attempt = 0; attempt < 100; attempt++) {
                    const candidate = {
                        x: minX + Math.random() * (maxX - minX),
                        y: minY + Math.random() * (maxY - minY)
                    };

                    const overlap = this.pieces.some(other => {
                        const p1 = { x: other.position.x + other.offset.width, y: other.position.y + other.offset.height };
                        const p2 = { x: candidate.x + offsetX, y: candidate.y + offsetY };
                        const size1 = (other.rotation % 2 === 1) ? { width: pieceHeight, height: pieceWidth } : { width: pieceWidth, height: pieceHeight };
                        const size2 = (randomRot % 2 === 1) ? { width: pieceHeight, height: pieceWidth } : { width: pieceWidth, height: pieceHeight };
                        return Math.abs(p1.x - p2.x) < (size1.width + size2.width) * 0.45 &&
                               Math.abs(p1.y - p2.y) < (size1.height + size2.height) * 0.45;
                    });

                    if (!overlap) {
                        position = candidate;
                        success = true;
                        break;
                    }
                }

                if (!success) {
                    position = {
                        x: minX + Math.random() * (maxX - minX),
                        y: minY + Math.random() * (maxY - minY)
                    };
                }

                const piece = new Piece({
                    row: r,
                    column: c,
                    position: position,
                    offset: { width: offsetX, height: offsetY },
                    rotation: randomRot,
                    zIndex: 1,
                    canvas: pCanvas,
                    width: pieceWidth,
                    height: pieceHeight
                });

                this.createPieceElement(piece, pieceIndex);
                this.pieces.push(piece);
                pieceIndex++;
            }
        }

        this.renderAllPieces();
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

    bindPiecePointerEvents(elem, pieceIndex) {
        elem.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.soundPlayer.init();

            const targetPiece = this.pieces[pieceIndex];

            // 既にこのピースまたは同じグループが別の指でドラッグ中なら重複操作を防ぐ
            for (const [pId, sess] of this.activePointers.entries()) {
                const sessPiece = this.pieces[sess.pieceIndex];
                if (sess.pieceIndex === pieceIndex ||
                    (targetPiece.groupID && sessPiece.groupID && targetPiece.groupID === sessPiece.groupID)) {
                    return;
                }
            }

            // 最前面化
            this.maxZIndex += 2;
            targetPiece.zIndex = this.maxZIndex;
            if (targetPiece.groupID) {
                this.pieces.forEach(p => {
                    if (p.groupID === targetPiece.groupID) p.zIndex = this.maxZIndex;
                });
            }
            this.renderAllPieces();

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

            if (!session.isDragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
                session.isDragging = true;
                elem.classList.add('dragging');
            }

            if (session.isDragging) {
                const targetPiece = this.pieces[session.pieceIndex];
                const stageW = this.dom.puzzleStage.clientWidth || window.innerWidth;
                const stageH = this.dom.puzzleStage.clientHeight || window.innerHeight;

                // 画面外への飛び出し防止（ピースの一部が必ず画面内に残る）
                const clampMarginX = targetPiece.width * 0.4;
                const clampMarginY = targetPiece.height * 0.4;
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
            }
        });

        const handlePointerEnd = (e) => {
            const session = this.activePointers.get(e.pointerId);
            if (!session) return;
            this.activePointers.delete(e.pointerId);

            elem.classList.remove('dragging');
            try { elem.releasePointerCapture(e.pointerId); } catch (err) {}

            const targetPiece = this.pieces[session.pieceIndex];

            if (!session.isDragging) {
                // タップ判定：回転のロックをはずした（回転OFFの）ときは回転しない！
                if (this.allowRotation) {
                    if (targetPiece.groupID) {
                        targetPiece.rotation = 0;
                    } else {
                        targetPiece.rotation = (targetPiece.rotation + 1) % 4;
                    }
                    this.renderAllPieces();
                }
            } else {
                // ドラッグ終了：吸着判定
                this.checkSnap(session.pieceIndex);
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
        };

        elem.addEventListener('pointerup', handlePointerEnd);
        elem.addEventListener('pointercancel', handlePointerEnd);
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
    checkSnap(offset) {
        const piece = this.pieces[offset];
        if (piece.rotation !== 0) return;

        const snapThreshold = 2500;
        let anyConnected = false;

        let loopCount = 0;
        while (loopCount < 10) {
            loopCount++;
            let connectedInLoop = false;
            const position = piece.position;

            const distances = this.pieces.map((other, idx) => {
                if (idx === offset) return 999999999;
                if (piece.groupID && other.groupID && piece.groupID === other.groupID) {
                    return 999999999;
                }
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
        }

        // クリア判定
        if (!this.clear && piece.groupID) {
            const allSame = this.pieces.every(p => p.groupID && p.groupID === piece.groupID);
            if (allSame) {
                this.clear = true;
                this.numOfClear++;
                this.soundPlayer.playPinpon();
                this.dom.clearCount.textContent = String(this.numOfClear);

                if (this.numOfClear >= this.questions) {
                    setTimeout(() => {
                        this.showScreen('home');
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.dom.nextOverlay.classList.remove('hidden');
                    }, 400);
                }
            }
        }
    }
}

// 起動
window.addEventListener('DOMContentLoaded', () => {
    new PhotoPuzzleApp();
});
