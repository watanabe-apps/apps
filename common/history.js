/**
 * apps/common/history.js
 * 学習履歴の共通ヘルパー（履歴フォーマット v1）
 *
 * 使い方（各アプリの HTML で読み込む）:
 *   <script src="../common/history.js"></script>
 *
 * 保存:
 *   AppHistory.save('karuta', {
 *       result:   { total: 8, correct: 8, miss: 2, durationSec: 95 },
 *       settings: { '問題数': 8, '札の数': '3×4' },
 *       details:  [{ q: 'いぬ', ok: false, miss: ['ねこ'] }, { q: 'あり', ok: true }],
 *       extra:    { wrongWords: ['いぬ'] }
 *   });
 *
 * 読み込み（新しい順。壊れたデータは自動で除外）:
 *   const list = AppHistory.load('karuta');
 *
 * 1件のレコード（v1）:
 *   {
 *     v: 1,                 // 形式のバージョン
 *     app: 'karuta',        // アプリID
 *     id: '1729729200000-x7k2',
 *     ts: 1729729200000,    // 日時（ミリ秒）
 *     result:   { total, correct, miss, perfect, durationSec? },
 *     settings: { '表示名': 値, ... },
 *     details:  [{ q, ok, miss?, ...自由項目 }, ...],
 *     extra:    { ...アプリ固有 }
 *   }
 *
 * 注意:
 *   - 保存先のキーは既定で「<アプリID>_history」。既存のキー名を使う場合は options.key で指定。
 *   - 保存時、同じキーに残っている古い形式（v なし）のデータは消さずにそのまま残す。
 */
(function (global) {
    'use strict';

    const VERSION = 1;
    const DEFAULT_LIMIT = 50;

    // ==========================================
    // 1. 小さな変換ユーティリティ
    // ==========================================
    function isPlainObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    function toNumber(value, fallback) {
        const n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    }

    function toStringArray(value) {
        if (Array.isArray(value)) {
            return value.filter(v => v !== null && v !== undefined && v !== '').map(v => String(v));
        }
        if (value === null || value === undefined || value === '') return [];
        return [String(value)];
    }

    function makeId(ts) {
        return `${ts}-${Math.random().toString(36).slice(2, 6)}`;
    }

    const APP_DEFAULT_KEYS = {
        ikutsuto_ikutsu: 'mathDetailedHistory'
    };

    function storageKey(appId, options) {
        if (options && options.key) return options.key;
        if (APP_DEFAULT_KEYS[appId]) return APP_DEFAULT_KEYS[appId];
        return `${appId}_history`;
    }

    // ==========================================
    // 2. localStorage の安全な読み書き
    // ==========================================
    function readRaw(key) {
        try {
            const str = global.localStorage.getItem(key);
            if (!str) return [];
            const parsed = JSON.parse(str);
            return Array.isArray(parsed) ? parsed.filter(isPlainObject) : [];
        } catch (e) {
            console.warn(`[AppHistory] 「${key}」を読み込めませんでした`, e);
            return [];
        }
    }

    function writeRaw(key, list) {
        try {
            global.localStorage.setItem(key, JSON.stringify(list));
            return true;
        } catch (e) {
            // 容量オーバーなどの場合は古い方から半分に減らして再試行
            if (list.length > 1) {
                const half = list.slice(0, Math.ceil(list.length / 2));
                console.warn(`[AppHistory] 「${key}」を保存できなかったため、古い履歴を減らして再試行します`, e);
                return writeRaw(key, half);
            }
            console.warn(`[AppHistory] 「${key}」を保存できませんでした`, e);
            return false;
        }
    }

    // ==========================================
    // 3. レコードの正規化・検証
    // ==========================================
    function normalizeResult(result) {
        const r = isPlainObject(result) ? result : {};
        const total = Math.max(0, toNumber(r.total, 0));
        const correct = Math.max(0, toNumber(r.correct, 0));
        const miss = Math.max(0, toNumber(r.miss, 0));
        const perfect = (typeof r.perfect === 'boolean')
            ? r.perfect
            : (miss === 0 && correct > 0 && (total === 0 || correct >= total));

        const normalized = { total, correct, miss, perfect };
        const durationSec = toNumber(r.durationSec, NaN);
        if (Number.isFinite(durationSec) && durationSec >= 0) {
            normalized.durationSec = durationSec;
        }
        return normalized;
    }

    function normalizeSettings(settings) {
        if (!isPlainObject(settings)) return {};
        const out = {};
        Object.keys(settings).forEach(label => {
            const value = settings[label];
            if (value === null || value === undefined || value === '') return;
            out[label] = (typeof value === 'object') ? JSON.stringify(value) : value;
        });
        return out;
    }

    function normalizeDetails(details) {
        if (!Array.isArray(details)) return [];
        return details.filter(isPlainObject).map(d => {
            const item = Object.assign({}, d);
            item.q = (d.q === null || d.q === undefined) ? '' : String(d.q);
            item.ok = !!d.ok;
            const miss = toStringArray(d.miss);
            if (miss.length > 0) {
                item.miss = miss;
            } else {
                delete item.miss;
            }
            return item;
        });
    }

    /**
     * 任意のオブジェクトを v1 レコードに整える。
     * @param {string} appId
     * @param {object} data - { result, settings, details, extra, ts?, id? }
     * @returns {object} v1 レコード
     */
    function normalize(appId, data) {
        const d = isPlainObject(data) ? data : {};
        const ts = toNumber(d.ts, Date.now());
        return {
            v: VERSION,
            app: String(d.app || appId),
            id: d.id ? String(d.id) : makeId(ts),
            ts: ts,
            result: normalizeResult(d.result),
            settings: normalizeSettings(d.settings),
            details: normalizeDetails(d.details),
            extra: isPlainObject(d.extra) ? d.extra : {}
        };
    }

    /**
     * v1 として読めるレコードかどうか。
     * @param {any} record
     * @returns {boolean}
     */
    function isValid(record) {
        return isPlainObject(record)
            && toNumber(record.v, 0) >= 1
            && typeof record.app === 'string' && record.app.length > 0
            && Number.isFinite(Number(record.ts))
            && isPlainObject(record.result);
    }

    // ==========================================
    // 4. 公開 API
    // ==========================================

    /**
     * 履歴を1件保存する（先頭に追加・上限件数を超えた古いものは削除）。
     * @param {string} appId
     * @param {object} data - { result, settings?, details?, extra? }
     * @param {object} [options] - { key?: 保存キー, limit?: 上限件数 }
     * @returns {object|null} 保存したレコード（失敗時は null）
     */
    function save(appId, data, options) {
        if (!appId) {
            console.warn('[AppHistory] save にはアプリIDが必要です');
            return null;
        }
        const key = storageKey(appId, options);
        const limit = Math.max(1, toNumber(options && options.limit, DEFAULT_LIMIT));
        const record = normalize(appId, data);

        const list = readRaw(key);
        list.unshift(record);
        if (list.length > limit) list.length = limit;

        return writeRaw(key, list) ? record : null;
    }

    /**
     * 履歴を読み込む（新しい順）。
     * v1 レコードだけを返す。古い形式（v なし）は options.legacy を渡したときだけ変換して含める。
     * @param {string} appId
     * @param {object} [options] - { key?: 保存キー, legacy?: (古いレコード) => v1用データ|null }
     * @returns {object[]}
     */
    function load(appId, options) {
        const key = storageKey(appId, options);
        const legacy = options && typeof options.legacy === 'function' ? options.legacy : null;

        const list = [];
        readRaw(key).forEach(item => {
            try {
                if (isValid(item)) {
                    list.push(normalize(appId, item));
                } else if (legacy && item.v === undefined) {
                    const converted = legacy(item);
                    if (isPlainObject(converted)) list.push(normalize(appId, converted));
                }
            } catch (e) {
                console.warn('[AppHistory] 読めない履歴をスキップしました', e, item);
            }
        });

        return list.sort((a, b) => b.ts - a.ts);
    }

    /**
     * 指定した ID の履歴を1件削除する。
     * @param {string} appId
     * @param {string} id
     * @param {object} [options] - { key?: 保存キー }
     * @returns {boolean}
     */
    function remove(appId, id, options) {
        const key = storageKey(appId, options);
        const list = readRaw(key).filter(item => String(item.id) !== String(id));
        return writeRaw(key, list);
    }

    /**
     * そのアプリの履歴をすべて削除する。
     * @param {string} appId
     * @param {object} [options] - { key?: 保存キー }
     */
    function clear(appId, options) {
        try {
            global.localStorage.removeItem(storageKey(appId, options));
        } catch (e) {
            console.warn('[AppHistory] 履歴を削除できませんでした', e);
        }
    }

    /**
     * 履歴配列を一括で置き換える（バックアップのインポート用）。
     * @param {string} appId
     * @param {any[]} records
     * @param {object} [options] - { key?: 保存キー, limit?: 上限件数, legacy?: (古いレコード) => v1用データ|null }
     * @returns {boolean}
     */
    function replaceAll(appId, records, options) {
        if (!Array.isArray(records)) return false;
        const key = storageKey(appId, options);
        const limit = Math.max(1, toNumber(options && options.limit, DEFAULT_LIMIT));
        const legacy = options && typeof options.legacy === 'function' ? options.legacy : null;

        const out = [];
        records.filter(isPlainObject).forEach(item => {
            try {
                if (isValid(item)) {
                    out.push(normalize(appId, item));
                } else if (legacy && item.v === undefined) {
                    const converted = legacy(item);
                    if (isPlainObject(converted)) out.push(normalize(appId, converted));
                } else {
                    out.push(item);
                }
            } catch (e) {
                console.warn('[AppHistory] インポート時に読めない履歴をスキップしました', e, item);
            }
        });

        if (out.length > limit) out.length = limit;
        return writeRaw(key, out);
    }

    /**
     * 日付文字列や ID からミリ秒のタイムスタンプ（ts）を推定する（旧データの移行用）。
     * @param {string|number} dateOrTs
     * @param {string|number} [fallbackId] - Date.now() 由来の ID があれば優先利用
     * @returns {number} ミリ秒（解析できない場合は 0）
     */
    function parseDate(dateOrTs, fallbackId) {
        if (typeof dateOrTs === 'number' && Number.isFinite(dateOrTs) && dateOrTs > 0) {
            return dateOrTs;
        }
        if (fallbackId !== undefined && fallbackId !== null) {
            const idMatch = String(fallbackId).match(/^(\d{13})\b/);
            if (idMatch) {
                const n = Number(idMatch[1]);
                if (Number.isFinite(n) && n > 946684800000) return n; // 2000年以降
            }
        }
        if (typeof dateOrTs !== 'string' || !dateOrTs.trim()) return 0;
        const str = dateOrTs.trim();

        const currentYear = new Date().getFullYear();
        let year = currentYear, month = 1, day = 1, hour = 0, minute = 0;
        let matched = false;

        // 例: "2026/10/24 09:20", "2026-10-24"
        const m1 = str.match(/(\d{4})[\/\.\-](\d{1,2})[\/\.\-](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}))?/);
        if (m1) {
            year = Number(m1[1]);
            month = Number(m1[2]);
            day = Number(m1[3]);
            hour = m1[4] !== undefined ? Number(m1[4]) : 0;
            minute = m1[5] !== undefined ? Number(m1[5]) : 0;
            matched = true;
        } else {
            // 例: "10/24 09:20", "10月24日 09:20"
            const m2 = str.match(/(\d{1,2})(?:[\/\.\-]|月)(\d{1,2})日?(?:\s+(\d{1,2}):(\d{1,2}))?/);
            if (m2) {
                month = Number(m2[1]);
                day = Number(m2[2]);
                hour = m2[3] !== undefined ? Number(m2[3]) : 0;
                minute = m2[4] !== undefined ? Number(m2[4]) : 0;
                matched = true;
            }
        }

        if (matched) {
            const d = new Date(year, month - 1, day, hour, minute);
            if (!isNaN(d.getTime())) return d.getTime();
        }

        const parsed = Date.parse(str);
        return isNaN(parsed) ? 0 : parsed;
    }

    /**
     * ts（ミリ秒）を表示用の文字列にする。例: "2026/10/24 09:20"
     * @param {number} ts
     * @param {object} [options] - { time?: 時刻を含めるか（既定 true） }
     * @returns {string}
     */
    function formatDate(ts, options) {
        const num = toNumber(ts, NaN);
        if (!Number.isFinite(num) || num <= 0) return '日時不明';
        const date = new Date(num);
        if (isNaN(date.getTime())) return '日時不明';
        const pad = n => String(n).padStart(2, '0');
        const ymd = `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
        if (options && options.time === false) return ymd;
        return `${ymd} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    global.AppHistory = {
        VERSION,
        DEFAULT_LIMIT,
        save,
        load,
        remove,
        clear,
        replaceAll,
        normalize,
        isValid,
        parseDate,
        formatDate
    };
})(typeof window !== 'undefined' ? window : globalThis);

