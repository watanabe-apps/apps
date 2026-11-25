(function () {
  const STORAGE_KEY = 'guidebook_color_theme';
  const THEMES = [
    { id: 'light', label: '標準クリア', desc: '明るい余白とくっきり文字', swatchBg: '#ffffff', swatchFg: '#0369a1' },
    { id: 'paper', label: '生成り紙', desc: '暖色で目が疲れにくい紙風', swatchBg: '#fcfaf5', swatchFg: '#0f766e' },
    { id: 'sage', label: 'ミント緑', desc: '落ち着いた淡緑の配色', swatchBg: '#fafdfb', swatchFg: '#15803d' },
    { id: 'classic', label: 'クラシック', desc: '濃紺サイドバー（見やすさ改善）', swatchBg: '#162238', swatchFg: '#0369a1' },
    { id: 'contrast', label: '高コントラスト', desc: '白地に黒文字＋濃い枠線', swatchBg: '#ffffff', swatchFg: '#000000' },
    { id: 'dark', label: 'ナイト暗色', desc: '眩しさを抑えたダーク配色', swatchBg: '#19202e', swatchFg: '#67c8fa' },
    { id: 'neon', label: 'ネオン虹', desc: 'お遊び：極彩サイバーRGB発光', swatchBg: '#14082c', swatchFg: '#ff00cc' },
    { id: 'gold', label: 'きらびやか', desc: 'お遊び：黄金×宝石ゴージャス仕様', swatchBg: '#fef08a', swatchFg: '#d97706' },
    { id: 'space', label: '🚀 宇宙（クリックで流れ星）', desc: 'お遊び全開：星空・無重力・流れ星演出', swatchBg: '#030414', swatchFg: '#38bdf8' }
  ];
  const VALID_IDS = new Set(THEMES.map((t) => t.id));

  let spaceState = null;

  function readQueryTheme() {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('theme');
      return q && VALID_IDS.has(q) ? q : null;
    } catch (_) {
      return null;
    }
  }

  function readStoredTheme() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved && VALID_IDS.has(saved) ? saved : null;
    } catch (_) {
      return null;
    }
  }

  function saveTheme(themeId) {
    try {
      window.localStorage.setItem(STORAGE_KEY, themeId);
    } catch (_) {
      // Safari の file:// 環境などでは localStorage 書き込みが制限される場合があるため無視
    }
  }

  function syncFileProtocolLinks(themeId) {
    if (window.location.protocol !== 'file:') return;
    const links = document.querySelectorAll('.site-sidebar a[href], .nav-pager a[href], .portal-card a.card-link[href]');
    links.forEach((a) => {
      const raw = a.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.endsWith('.txt') || raw.includes('slides.html')) return;
      if (!/\.html([?#].*)?$/.test(raw)) return;
      try {
        const url = new URL(raw, window.location.href);
        url.searchParams.set('theme', themeId);
        const cleanBase = raw.split('?')[0].split('#')[0];
        a.setAttribute('href', `${cleanBase}?theme=${encodeURIComponent(themeId)}${url.hash}`);
      } catch (_) {
        // 相対リンク解決失敗時はそのまま維持
      }
    });
  }

  /* ----------------------------------------------------------------
     宇宙テーマ専用エフェクト（他テーマ選択時はDOMごと完全削除）
     ---------------------------------------------------------------- */
  function destroySpaceFx() {
    if (!spaceState) return;
    cancelAnimationFrame(spaceState.rafId);
    window.removeEventListener('resize', spaceState.onResize);
    document.removeEventListener('pointerdown', spaceState.onPointerDown, true);
    if (spaceState.bgCanvas && spaceState.bgCanvas.parentNode) {
      spaceState.bgCanvas.parentNode.removeChild(spaceState.bgCanvas);
    }
    if (spaceState.fxCanvas && spaceState.fxCanvas.parentNode) {
      spaceState.fxCanvas.parentNode.removeChild(spaceState.fxCanvas);
    }
    spaceState = null;
  }

  function spawnMeteorShower(state, originX, originY, count) {
    const colors = ['#7dd3fc', '#fde047', '#f472b6', '#c084fc', '#6ee7b7', '#ffffff'];
    const icons = ['🌠', '☄️', '✨', '🛸', '🪐'];
    const w = state.width;
    const h = state.height;

    for (let i = 0; i < count; i++) {
      const startX = originX + (Math.random() - 0.5) * 90;
      const startY = originY + (Math.random() - 0.5) * 60;
      const dirLeft = startX > w * 0.55;
      const baseAngle = dirLeft ? (Math.PI * 0.72) : (Math.PI * 0.24);
      const angle = baseAngle + (Math.random() - 0.5) * 0.35;
      const speed = 13 + Math.random() * 11;
      state.meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 120 + Math.random() * 110,
        color: colors[(i + Math.floor(Math.random() * colors.length)) % colors.length],
        life: 1,
        decay: 0.018 + Math.random() * 0.012,
        width: 2.2 + Math.random() * 2.2
      });
    }

    // クリック地点に星屑バースト＋ごくたまに宇宙絵文字が飛び出す
    for (let j = 0; j < 14; j++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 5.5;
      state.sparks.push({
        x: originX,
        y: originY,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: 1.5 + Math.random() * 2.6,
        color: colors[j % colors.length],
        life: 1,
        decay: 0.024 + Math.random() * 0.018
      });
    }

    state.rings.push({
      x: originX,
      y: originY,
      r: 8,
      maxR: 62,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1
    });

    if (Math.random() < 0.55) {
      state.floaters.push({
        x: originX,
        y: originY - 8,
        vx: (Math.random() - 0.5) * 3.2,
        vy: -2.2 - Math.random() * 2.2,
        text: icons[Math.floor(Math.random() * icons.length)],
        life: 1,
        rot: (Math.random() - 0.5) * 0.4
      });
    }
    void h;
  }

  function mountSpaceFx(celebrateOnEnter) {
    if (!document.body || spaceState) return;

    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'guidebook-space-bg';
    bgCanvas.setAttribute('aria-hidden', 'true');
    bgCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:0;';

    const fxCanvas = document.createElement('canvas');
    fxCanvas.id = 'guidebook-space-fx';
    fxCanvas.setAttribute('aria-hidden', 'true');
    fxCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9990;';

    document.body.insertBefore(bgCanvas, document.body.firstChild);
    document.body.appendChild(fxCanvas);

    const bgCtx = bgCanvas.getContext('2d');
    const fxCtx = fxCanvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const state = {
      bgCanvas,
      fxCanvas,
      width: window.innerWidth,
      height: window.innerHeight,
      stars: [],
      drifters: [],
      meteors: [],
      sparks: [],
      rings: [],
      floaters: [],
      rafId: 0,
      lastAmbient: performance.now(),
      onResize: null,
      onPointerDown: null
    };

    function seedStars() {
      state.stars = [];
      const count = Math.min(180, Math.max(90, Math.floor((state.width * state.height) / 9500)));
      const palette = ['#ffffff', '#bae6fd', '#fde68a', '#f5d0fe', '#a7f3d0'];
      for (let i = 0; i < count; i++) {
        state.stars.push({
          x: Math.random() * state.width,
          y: Math.random() * state.height,
          r: 0.7 + Math.random() * 2.1,
          phase: Math.random() * Math.PI * 2,
          speed: 0.015 + Math.random() * 0.035,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.08,
          color: palette[i % palette.length]
        });
      }
      state.drifters = [
        { emoji: '🪐', x: state.width * 0.18, y: state.height * 0.22, vx: 0.24, vy: 0.07, size: 32, spin: 0.004, angle: 0 },
        { emoji: '🛸', x: state.width * 0.78, y: state.height * 0.16, vx: -0.36, vy: 0.11, size: 26, spin: -0.008, angle: 0 },
        { emoji: '🚀', x: state.width * 0.62, y: state.height * 0.78, vx: 0.32, vy: -0.22, size: 24, spin: 0.003, angle: 0 },
        { emoji: '🌙', x: state.width * 0.88, y: state.height * 0.52, vx: -0.12, vy: -0.06, size: 28, spin: 0.002, angle: 0 }
      ];
    }

    function resize() {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      [bgCanvas, fxCanvas].forEach((c) => {
        c.width = Math.floor(state.width * dpr);
        c.height = Math.floor(state.height * dpr);
      });
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    }

    state.onResize = resize;
    state.onPointerDown = (e) => {
      spawnMeteorShower(state, e.clientX, e.clientY, 3);
    };

    window.addEventListener('resize', state.onResize);
    document.addEventListener('pointerdown', state.onPointerDown, true);
    resize();

    if (celebrateOnEnter) {
      spawnMeteorShower(state, state.width * 0.35, state.height * 0.28, 6);
      spawnMeteorShower(state, state.width * 0.72, state.height * 0.22, 5);
    }

    function tick(now) {
      bgCtx.clearRect(0, 0, state.width, state.height);

      // 星空と漂う惑星・UFO
      for (const s of state.stars) {
        s.phase += s.speed;
        s.x = (s.x + s.vx + state.width) % state.width;
        s.y = (s.y + s.vy + state.height) % state.height;
        const alpha = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(s.phase));
        bgCtx.globalAlpha = alpha;
        bgCtx.fillStyle = s.color;
        bgCtx.beginPath();
        bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bgCtx.fill();
      }

      bgCtx.globalAlpha = 0.55;
      for (const d of state.drifters) {
        d.x = (d.x + d.vx + state.width + 60) % (state.width + 60) - 30;
        d.y = (d.y + d.vy + state.height + 60) % (state.height + 60) - 30;
        d.angle += d.spin;
        bgCtx.save();
        bgCtx.translate(d.x, d.y);
        bgCtx.rotate(d.angle);
        bgCtx.font = `${d.size}px sans-serif`;
        bgCtx.textAlign = 'center';
        bgCtx.textBaseline = 'middle';
        bgCtx.fillText(d.emoji, 0, 0);
        bgCtx.restore();
      }
      bgCtx.globalAlpha = 1;

      // 自動の気まぐれ流れ星
      if (now - state.lastAmbient > 2600) {
        state.lastAmbient = now;
        spawnMeteorShower(
          state,
          Math.random() * state.width,
          Math.random() * state.height * 0.45,
          1
        );
      }

      // 前景：クリックで飛ぶ流れ星＆スターダスト
      fxCtx.clearRect(0, 0, state.width, state.height);

      for (let i = state.meteors.length - 1; i >= 0; i--) {
        const m = state.meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;
        if (m.life <= 0) {
          state.meteors.splice(i, 1);
          continue;
        }
        const mag = Math.hypot(m.vx, m.vy) || 1;
        const tailX = m.x - (m.vx / mag) * m.len * m.life;
        const tailY = m.y - (m.vy / mag) * m.len * m.life;
        const grad = fxCtx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.25, m.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        fxCtx.save();
        fxCtx.globalAlpha = Math.max(0, m.life);
        fxCtx.strokeStyle = grad;
        fxCtx.lineWidth = m.width;
        fxCtx.lineCap = 'round';
        fxCtx.shadowColor = m.color;
        fxCtx.shadowBlur = 14;
        fxCtx.beginPath();
        fxCtx.moveTo(m.x, m.y);
        fxCtx.lineTo(tailX, tailY);
        fxCtx.stroke();

        fxCtx.fillStyle = '#ffffff';
        fxCtx.beginPath();
        fxCtx.arc(m.x, m.y, m.width * 0.9, 0, Math.PI * 2);
        fxCtx.fill();
        fxCtx.restore();
      }

      for (let i = state.sparks.length - 1; i >= 0; i--) {
        const sp = state.sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.97;
        sp.vy *= 0.97;
        sp.life -= sp.decay;
        if (sp.life <= 0) {
          state.sparks.splice(i, 1);
          continue;
        }
        fxCtx.save();
        fxCtx.globalAlpha = sp.life;
        fxCtx.fillStyle = sp.color;
        fxCtx.shadowColor = sp.color;
        fxCtx.shadowBlur = 8;
        fxCtx.beginPath();
        fxCtx.arc(sp.x, sp.y, sp.r * sp.life, 0, Math.PI * 2);
        fxCtx.fill();
        fxCtx.restore();
      }

      for (let i = state.rings.length - 1; i >= 0; i--) {
        const rg = state.rings[i];
        rg.r += 2.6;
        rg.life = 1 - rg.r / rg.maxR;
        if (rg.life <= 0) {
          state.rings.splice(i, 1);
          continue;
        }
        fxCtx.save();
        fxCtx.globalAlpha = rg.life * 0.75;
        fxCtx.strokeStyle = rg.color;
        fxCtx.lineWidth = 2;
        fxCtx.beginPath();
        fxCtx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        fxCtx.stroke();
        fxCtx.restore();
      }

      for (let i = state.floaters.length - 1; i >= 0; i--) {
        const fl = state.floaters[i];
        fl.x += fl.vx;
        fl.y += fl.vy;
        fl.life -= 0.022;
        if (fl.life <= 0) {
          state.floaters.splice(i, 1);
          continue;
        }
        fxCtx.save();
        fxCtx.globalAlpha = fl.life;
        fxCtx.translate(fl.x, fl.y);
        fxCtx.rotate(fl.rot * (1 - fl.life) * 4);
        fxCtx.font = '22px sans-serif';
        fxCtx.textAlign = 'center';
        fxCtx.textBaseline = 'middle';
        fxCtx.fillText(fl.text, 0, 0);
        fxCtx.restore();
      }

      state.rafId = requestAnimationFrame(tick);
    }

    spaceState = state;
    state.rafId = requestAnimationFrame(tick);
  }

  function applyTheme(themeId, persist, interactive) {
    const target = VALID_IDS.has(themeId) ? themeId : 'light';
    document.documentElement.setAttribute('data-theme', target);
    if (persist) {
      saveTheme(target);
    }
    syncFileProtocolLinks(target);

    if (target === 'space') {
      if (document.body) {
        mountSpaceFx(Boolean(interactive));
      }
    } else {
      destroySpaceFx();
    }

    document.querySelectorAll('.theme-chip[data-theme-id]').forEach((btn) => {
      const active = btn.getAttribute('data-theme-id') === target;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function mountThemeSwitcher() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    if (current === 'space') {
      mountSpaceFx(false);
    }

    const sidebar = document.querySelector('.site-sidebar');
    if (!sidebar || sidebar.querySelector('.sidebar-theme-box')) return;

    const box = document.createElement('div');
    box.className = 'sidebar-theme-box no-select';

    const title = document.createElement('div');
    title.className = 'sidebar-nav-title';
    title.textContent = '🎨 配色パターン';
    box.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'theme-chip-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', 'ガイドブック配色テーマ切り替え');

    THEMES.forEach((t) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-chip' + (t.id === current ? ' active' : '');
      btn.setAttribute('data-theme-id', t.id);
      btn.setAttribute('title', t.desc);
      btn.setAttribute('aria-pressed', t.id === current ? 'true' : 'false');

      const swatches = document.createElement('span');
      swatches.className = 'theme-swatches';
      swatches.innerHTML = `<i style="background:${t.swatchBg}"></i><i style="background:${t.swatchFg}"></i>`;

      const label = document.createElement('span');
      label.className = 'theme-chip-label';
      label.textContent = t.label;

      btn.appendChild(swatches);
      btn.appendChild(label);
      btn.addEventListener('click', () => applyTheme(t.id, true, true));
      grid.appendChild(btn);
    });

    box.appendChild(grid);
    sidebar.appendChild(box);
    syncFileProtocolLinks(current);
  }

  // 描画前のフラッシュを防ぐため <head> 読み込み時に即座に適用
  const queryTheme = readQueryTheme();
  const initialTheme = queryTheme || readStoredTheme() || 'light';
  applyTheme(initialTheme, Boolean(queryTheme), false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountThemeSwitcher);
  } else {
    mountThemeSwitcher();
  }
})();
