(function () {
  const STORAGE_KEY = 'guidebook_color_theme';
  const BIGBANG_FLAG = 'GB_BIGBANG';
  const THEMES = [
    { id: 'light', label: '標準クリア', desc: '明るい余白とくっきり文字', swatchBg: '#ffffff', swatchFg: '#0369a1' },
    { id: 'paper', label: '生成り紙', desc: '暖色で目が疲れにくい紙風', swatchBg: '#fcfaf5', swatchFg: '#0f766e' },
    { id: 'sage', label: 'ミント緑', desc: '落ち着いた淡緑の配色', swatchBg: '#fafdfb', swatchFg: '#15803d' },
    { id: 'classic', label: 'クラシック', desc: '濃紺サイドバー（見やすさ改善）', swatchBg: '#162238', swatchFg: '#0369a1' },
    { id: 'contrast', label: '高コントラスト', desc: '白地に黒文字＋濃い枠線', swatchBg: '#ffffff', swatchFg: '#000000' },
    { id: 'dark', label: 'ナイト暗色', desc: '眩しさを抑えたダーク配色', swatchBg: '#19202e', swatchFg: '#67c8fa' },
    { id: 'neon', label: 'ネオン虹', desc: 'お遊び：極彩サイバーRGB発光', swatchBg: '#14082c', swatchFg: '#ff00cc' },
    { id: 'gold', label: 'きらびやか', desc: 'お遊び：黄金×宝石ゴージャス仕様', swatchBg: '#fef08a', swatchFg: '#d97706' },
    { id: 'space', label: '宇宙', desc: '深宇宙モード', swatchBg: '#040711', swatchFg: '#93c5fd' }
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
     宇宙テーマ専用 Canvas FX（他テーマ選択時は完全に削除・停止）
     ---------------------------------------------------------------- */
  function clearBigBangDom() {
    document.documentElement.classList.remove(
      'space-bigbang-shake',
      'space-bigbang-arrive-wrap',
      'space-bigbang-prearrive',
      'space-bh-suction'
    );
    document.querySelectorAll('.space-bigbang-veil').forEach((el) => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    document.querySelectorAll('[data-space-sucked="1"]').forEach((el) => {
      el.removeAttribute('data-space-sucked');
      el.style.transition = '';
      el.style.transform = '';
      el.style.opacity = '';
      el.style.transformOrigin = '';
    });
  }

  function destroySpaceFx() {
    if (!spaceState) return;
    cancelAnimationFrame(spaceState.rafId);
    if (spaceState.bangTimers) {
      spaceState.bangTimers.forEach((id) => clearTimeout(id));
    }
    window.removeEventListener('resize', spaceState.onResize);
    window.removeEventListener('pagehide', spaceState.onPageHide);
    window.removeEventListener('pageshow', spaceState.onPageShow);
    document.removeEventListener('pointerdown', spaceState.onPointerDown, true);
    document.removeEventListener('click', spaceState.onLinkClick, true);
    if (spaceState.bgCanvas && spaceState.bgCanvas.parentNode) {
      spaceState.bgCanvas.parentNode.removeChild(spaceState.bgCanvas);
    }
    if (spaceState.fxCanvas && spaceState.fxCanvas.parentNode) {
      spaceState.fxCanvas.parentNode.removeChild(spaceState.fxCanvas);
    }
    clearBigBangDom();
    spaceState = null;
  }

  function drawFourPointStar(ctx, x, y, outerR, color, alpha, rotation) {
    const innerR = outerR * 0.16;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation || 0);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = outerR * 1.2;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / 4;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function spawnMeteorShower(state, originX, originY, count) {
    const colors = ['#ffffff', '#e0f2fe', '#bfdbfe', '#fde68a'];
    const w = state.width;

    for (let i = 0; i < count; i++) {
      const startX = originX + (Math.random() - 0.5) * 60;
      const startY = originY + (Math.random() - 0.5) * 40;
      const dirLeft = startX > w * 0.55;
      const baseAngle = dirLeft ? (Math.PI * 0.74) : (Math.PI * 0.23);
      const angle = baseAngle + (Math.random() - 0.5) * 0.24;
      const speed = 13 + Math.random() * 9;
      state.meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 130 + Math.random() * 110,
        color: colors[i % colors.length],
        life: 1,
        decay: 0.015 + Math.random() * 0.008,
        width: 1.8 + Math.random() * 1.4
      });
    }

    state.flares.push({
      x: originX,
      y: originY,
      vx: 0,
      vy: 0,
      r: 11,
      color: '#f8fafc',
      rot: Math.random() * Math.PI,
      life: 1,
      decay: 0.032
    });

    for (let j = 0; j < 8; j++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.4 + Math.random() * 3.4;
      state.sparks.push({
        x: originX,
        y: originY,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: 0.9 + Math.random() * 1.5,
        color: colors[j % colors.length],
        life: 1,
        decay: 0.022 + Math.random() * 0.014
      });
    }
  }

  function startLightConvergence(state, cx, cy) {
    // 1. UI要素（枠・見出し・ナビ・リンク群）を一点へ静かに収束させる（blur不使用で60fps維持）
    document.documentElement.classList.add('space-bh-suction');
    const targets = document.querySelectorAll(
      '.site-sidebar, .doc-header, .summary-box, .section-block, .portal-card, .nav-pager'
    );
    const vectors = [];
    targets.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const ex = rect.left + rect.width * 0.5;
      const ey = rect.top + rect.height * 0.5;
      vectors.push({
        el,
        dx: cx - ex,
        dy: cy - ey,
        rot: (cx - ex >= 0 ? 1 : -1) * (4 + (idx % 3) * 2)
      });
      el.setAttribute('data-space-sucked', '1');
      el.style.transformOrigin = 'center center';
      el.style.transition = 'transform 1.32s cubic-bezier(0.7, 0.02, 0.88, 0.25), opacity 1.12s ease-in';
      void el.offsetWidth;
    });

    requestAnimationFrame(() => {
      if (!spaceState || !spaceState.bang) return;
      vectors.forEach(({ el, dx, dy, rot }) => {
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(0.02) rotate(${rot}deg)`;
        el.style.opacity = '0';
      });
    });

    // 2. 背景の星すべてを中心点へ向かう流線軌道にする
    for (const s of state.stars) {
      s.sucking = true;
    }

    // 3. 周囲から一点へ吸い込まれる光の粒子群
    const streamColors = ['#ffffff', '#e0f2fe', '#93c5fd', '#fef3c7', '#c7d2fe'];
    for (let i = 0; i < 88; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 110 + Math.random() * Math.max(state.width, state.height) * 0.62;
      state.inwardRays.push({
        angle,
        dist,
        angularVel: 0.014 + Math.random() * 0.022,
        pullSpeed: dist / 74 + 1.5 + Math.random() * 2.2,
        r: 1.0 + Math.random() * 1.9,
        color: streamColors[i % streamColors.length],
        prevX: cx + Math.cos(angle) * dist,
        prevY: cy + Math.sin(angle) * dist
      });
    }
  }

  function spawnBigBangDetonation(state, cx, cy, stage) {
    const isMain = stage === 'depart';
    const colors = isMain
      ? ['#ffffff', '#e0f2fe', '#93c5fd', '#fef3c7', '#c7d2fe']
      : ['#60a5fa', '#818cf8', '#f59e0b', '#38bdf8', '#ffffff'];
    const rayCount = isMain ? 48 : 26;
    const sparkCount = isMain ? 220 : 120;
    const ringCount = isMain ? 5 : 3;

    for (let i = 0; i < rayCount; i++) {
      const angle = (Math.PI * 2 * i) / rayCount + (Math.random() - 0.5) * 0.1;
      const speed = (isMain ? 14 : 9) + Math.random() * 14;
      state.meteors.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: (isMain ? 240 : 190) + Math.random() * 200,
        color: colors[i % colors.length],
        life: 1,
        decay: isMain ? 0.011 : 0.0085,
        width: (isMain ? 2.6 : 2.2) + Math.random() * 1.8
      });
    }

    for (let j = 0; j < sparkCount; j++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.0 + Math.random() * (isMain ? 16 : 11);
      state.sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.3 + Math.random() * 3.0,
        color: colors[j % colors.length],
        life: 1,
        decay: isMain ? (0.0085 + Math.random() * 0.008) : (0.0065 + Math.random() * 0.0065)
      });
    }

    for (let f = 0; f < (isMain ? 16 : 10); f++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 3 + Math.random() * 9;
      state.flares.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: 10 + Math.random() * 18,
        color: colors[f % colors.length],
        rot: Math.random() * Math.PI,
        life: 1,
        decay: isMain ? 0.014 : 0.0095
      });
    }

    for (let k = 0; k < ringCount; k++) {
      state.rings.push({
        x: cx,
        y: cy,
        r: 8 + k * 22,
        maxR: Math.max(state.width, state.height) * 1.45,
        grow: isMain ? (13 + k * 4.5) : (9 + k * 3.2),
        lineWidth: 3.0 - k * 0.45,
        color: colors[k % colors.length],
        life: 1
      });
    }
  }

  function triggerArrivalBigBang(state) {
    clearBigBangDom();
    document.documentElement.classList.add('space-bigbang-arrive-wrap');

    const veil = document.createElement('div');
    veil.className = 'space-bigbang-veil';
    document.body.appendChild(veil);

    const cx = state.width * 0.5;
    const cy = state.height * 0.44;
    spawnBigBangDetonation(state, cx, cy, 'arrive');

    const t1 = setTimeout(() => {
      if (!spaceState) return;
      spawnMeteorShower(state, state.width * 0.22, state.height * 0.2, 1);
      spawnMeteorShower(state, state.width * 0.8, state.height * 0.24, 1);
    }, 750);
    const t2 = setTimeout(() => {
      if (!spaceState) return;
      spawnMeteorShower(state, state.width * 0.54, state.height * 0.16, 1);
    }, 1450);
    const t3 = setTimeout(() => {
      document.documentElement.classList.remove('space-bigbang-arrive-wrap');
      if (veil.parentNode) veil.parentNode.removeChild(veil);
    }, 2400);

    state.bangTimers.push(t1, t2, t3);
  }

  function drawConvergenceAndBloom(ctx, bang, now) {
    const cx = bang.cx;
    const cy = bang.cy;
    const maxCornerDist = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(bang.w - cx, cy),
      Math.hypot(cx, bang.h - cy),
      Math.hypot(bang.w - cx, bang.h - cy)
    );

    if (bang.stage === 'converge') {
      const elapsed = now - bang.startTime;

      // 光が中心へ奪われていく静かな暗転（0〜1350ms）
      const dim = Math.min(0.65, (elapsed / 1350) * 0.65);
      ctx.fillStyle = `rgba(2, 3, 10, ${dim.toFixed(3)})`;
      ctx.fillRect(0, 0, bang.w, bang.h);

      // 一点へ集まる極細の光点（ブラックホール円盤は描かず、光が凝縮した輝点のみ）
      if (elapsed < 1350) {
        const p = elapsed / 1350;
        const haloR = 16 + Math.sin(p * Math.PI * 0.7) * 32;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.4 + p * 0.6})`);
        grad.addColorStop(0.28, `rgba(186, 230, 253, ${0.24 + p * 0.45})`);
        grad.addColorStop(1, 'rgba(186, 230, 253, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        ctx.fill();

        drawFourPointStar(ctx, cx, cy, 6 + p * 18, '#ffffff', 0.5 + p * 0.5, p * 1.1);
      } else {
        // 時間差の静寂（1350〜1680ms）：極小の一点へ極限凝縮して溜める
        const holdP = Math.min(1, (elapsed - 1350) / 330);
        const compressedR = 18 * (1 - holdP * 0.65) + 4;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, compressedR * 2.2);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.25, 'rgba(224, 242, 254, 0.92)');
        grad.addColorStop(1, 'rgba(186, 230, 253, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, compressedR * 2.2, 0, Math.PI * 2);
        ctx.fill();

        drawFourPointStar(ctx, cx, cy, 24 * (1 - holdP * 0.65) + 5, '#ffffff', 1, 1.1 + holdP * 0.4);
      }
      return;
    }

    // ------------------------------------------------------------
    // Stage 2: 放出・大爆発（真球光球は粒子や光条の背後で膨張し、決して粒子を隠さない）
    // ------------------------------------------------------------
    const blastElapsed = now - bang.blastStart;
    const blastT = Math.min(1, blastElapsed / 1180);

    // 爆発最初の0.45秒は暗い背景のままで光条・衝撃波をはっきり見せ、その後円球光が全体を満たす
    const floodT = blastT < 0.34 ? 0 : (blastT - 0.34) / 0.66;
    const eased = Math.pow(floodT, 1.75);
    const sphereR = 26 + eased * (maxCornerDist * 1.9);
    const fullFlood = sphereR > maxCornerDist * 1.08
      ? Math.min(1, (sphereR - maxCornerDist * 1.08) / (maxCornerDist * 0.65))
      : 0;

    ctx.fillStyle = `rgba(2, 3, 10, ${(0.65 * (1 - blastT)).toFixed(3)})`;
    ctx.fillRect(0, 0, bang.w, bang.h);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereR);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.22, 'rgba(241, 247, 255, 0.96)');
    grad.addColorStop(0.54, `rgba(219, 234, 254, ${0.42 + fullFlood * 0.58})`);
    grad.addColorStop(0.82, `rgba(226, 238, 252, ${fullFlood * 0.94})`);
    grad.addColorStop(1, `rgba(230, 238, 249, ${fullFlood})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, bang.w, bang.h);
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
    fxCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';

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
      inwardRays: [],
      meteors: [],
      sparks: [],
      flares: [],
      rings: [],
      bang: null,
      rafId: 0,
      navLock: false,
      bangTimers: [],
      lastAmbient: performance.now(),
      onResize: null,
      onPointerDown: null,
      onLinkClick: null,
      onPageHide: null,
      onPageShow: null
    };

    function seedStars() {
      state.stars = [];
      const count = Math.min(240, Math.max(120, Math.floor((state.width * state.height) / 7200)));
      const palette = ['#ffffff', '#e2e8f0', '#dbeafe', '#fef3c7', '#cbd5e1'];
      for (let i = 0; i < count; i++) {
        state.stars.push({
          x: Math.random() * state.width,
          y: Math.random() * state.height,
          r: 0.55 + Math.random() * 1.75,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.025,
          vx: (Math.random() - 0.5) * 0.09,
          vy: (Math.random() - 0.5) * 0.04,
          color: palette[i % palette.length],
          sparkle: i % 18 === 0,
          sucking: false
        });
      }
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
      if (!state.navLock) {
        seedStars();
      }
    }

    state.onResize = resize;
    state.onPointerDown = (e) => {
      if (state.navLock) return;
      spawnMeteorShower(state, e.clientX, e.clientY, 2);
    };

    state.onLinkClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const anchor = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.endsWith('.txt')) return;
      if (/^(https?:|mailto:|tel:|javascript:)/i.test(raw)) return;

      e.preventDefault();
      if (state.navLock) return;
      state.navLock = true;

      const cx = e.clientX > 0 ? e.clientX : state.width * 0.5;
      const cy = e.clientY > 0 ? e.clientY : state.height * 0.5;

      clearBigBangDom();
      state.bang = {
        cx,
        cy,
        startTime: 0,
        blastStart: 0,
        w: state.width,
        h: state.height,
        stage: 'converge',
        navHref: anchor.href
      };

      // Stage 1: 光と星とUIが一点に静かに収束（以降の発火・遷移は tick() 内で確実に同期進行）
      startLightConvergence(state, cx, cy);
    };

    state.onPageHide = () => {
      state.navLock = false;
      state.bang = null;
      state.inwardRays = [];
      state.bangTimers.forEach((id) => clearTimeout(id));
      state.bangTimers = [];
      clearBigBangDom();
    };

    state.onPageShow = (e) => {
      if (e.persisted) {
        state.navLock = false;
        state.bang = null;
        state.inwardRays = [];
        seedStars();
        clearBigBangDom();
      }
    };

    window.addEventListener('resize', state.onResize);
    window.addEventListener('pagehide', state.onPageHide);
    window.addEventListener('pageshow', state.onPageShow);
    document.addEventListener('pointerdown', state.onPointerDown, true);
    document.addEventListener('click', state.onLinkClick, true);
    resize();

    if (window.name === BIGBANG_FLAG) {
      window.name = '';
      triggerArrivalBigBang(state);
    } else if (celebrateOnEnter) {
      spawnMeteorShower(state, state.width * 0.36, state.height * 0.24, 2);
      spawnMeteorShower(state, state.width * 0.72, state.height * 0.2, 2);
    }

    function tick(now) {
      // ビッグバン状態遷移（タイマーのズレによる不発を完全に防止）
      if (state.bang) {
        if (!state.bang.startTime) state.bang.startTime = now;
        const elapsed = now - state.bang.startTime;
        if (state.bang.stage === 'converge' && elapsed >= 1680) {
          state.bang.stage = 'detonated';
          state.bang.blastStart = now;
          state.inwardRays = [];
          document.documentElement.classList.add('space-bigbang-shake');
          spawnBigBangDetonation(state, state.bang.cx, state.bang.cy, 'depart');
        } else if (state.bang.stage === 'detonated' && now - state.bang.blastStart >= 1220) {
          state.bang.stage = 'navigating';
          const href = state.bang.navHref;
          try {
            window.name = BIGBANG_FLAG;
          } catch (_) {}
          window.location.href = href;
          return;
        }
      }

      bgCtx.clearRect(0, 0, state.width, state.height);

      for (let i = state.stars.length - 1; i >= 0; i--) {
        const s = state.stars[i];
        s.phase += s.speed;

        if (s.sucking && state.bang && state.bang.stage === 'converge') {
          const dx = state.bang.cx - s.x;
          const dy = state.bang.cy - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 10) {
            state.stars.splice(i, 1);
            continue;
          }
          const nx = dx / dist;
          const ny = dy / dist;
          const tx = -ny;
          const ty = nx;
          const pull = Math.min(24, 2.5 + (2500 / (dist + 60)));
          const spin = Math.min(6, 0.3 + (420 / (dist + 55)));
          const prevX = s.x;
          const prevY = s.y;
          s.x += nx * pull + tx * spin;
          s.y += ny * pull + ty * spin;

          bgCtx.save();
          bgCtx.strokeStyle = s.color;
          bgCtx.lineWidth = s.r * 1.15;
          bgCtx.lineCap = 'round';
          bgCtx.globalAlpha = 0.85;
          bgCtx.beginPath();
          bgCtx.moveTo(prevX - nx * pull * 1.4, prevY - ny * pull * 1.4);
          bgCtx.lineTo(s.x, s.y);
          bgCtx.stroke();
          bgCtx.restore();
        } else {
          s.x = (s.x + s.vx + state.width) % state.width;
          s.y = (s.y + s.vy + state.height) % state.height;
          const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(s.phase));
          if (s.sparkle && alpha > 0.76) {
            drawFourPointStar(bgCtx, s.x, s.y, s.r * 2.7, s.color, alpha * 0.85, s.phase * 0.2);
          } else {
            bgCtx.globalAlpha = alpha;
            bgCtx.fillStyle = s.color;
            bgCtx.beginPath();
            bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            bgCtx.fill();
          }
        }
      }
      bgCtx.globalAlpha = 1;

      if (!state.navLock && now - state.lastAmbient > 3600) {
        state.lastAmbient = now;
        spawnMeteorShower(
          state,
          Math.random() * state.width,
          Math.random() * state.height * 0.42,
          1
        );
      }

      fxCtx.clearRect(0, 0, state.width, state.height);

      // まず背後に収束光／爆発真球光を描画（粒子・光条・波紋が手前で必ず輝くようにする）
      if (state.bang) {
        drawConvergenceAndBloom(fxCtx, state.bang, now);
      }

      // 収束中に中心へ流れる光粒子
      if (state.bang && state.bang.stage === 'converge') {
        for (let i = state.inwardRays.length - 1; i >= 0; i--) {
          const ir = state.inwardRays[i];
          ir.angle += ir.angularVel;
          ir.dist -= ir.pullSpeed;
          if (ir.dist <= 3) {
            state.inwardRays.splice(i, 1);
            continue;
          }
          const nx = state.bang.cx + Math.cos(ir.angle) * ir.dist;
          const ny = state.bang.cy + Math.sin(ir.angle) * ir.dist;
          fxCtx.save();
          fxCtx.strokeStyle = ir.color;
          fxCtx.lineWidth = ir.r;
          fxCtx.lineCap = 'round';
          fxCtx.globalAlpha = Math.min(1, ir.dist / 35) * 0.85;
          fxCtx.beginPath();
          fxCtx.moveTo(ir.prevX, ir.prevY);
          fxCtx.lineTo(nx, ny);
          fxCtx.stroke();
          fxCtx.restore();
          ir.prevX = nx;
          ir.prevY = ny;
        }
      }

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
        grad.addColorStop(0.22, m.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        fxCtx.save();
        fxCtx.globalAlpha = Math.max(0, m.life);
        fxCtx.strokeStyle = grad;
        fxCtx.lineWidth = m.width;
        fxCtx.lineCap = 'round';
        fxCtx.shadowColor = m.color;
        fxCtx.shadowBlur = 12;
        fxCtx.beginPath();
        fxCtx.moveTo(m.x, m.y);
        fxCtx.lineTo(tailX, tailY);
        fxCtx.stroke();

        fxCtx.fillStyle = '#ffffff';
        fxCtx.beginPath();
        fxCtx.arc(m.x, m.y, m.width * 0.85, 0, Math.PI * 2);
        fxCtx.fill();
        fxCtx.restore();
      }

      for (let i = state.sparks.length - 1; i >= 0; i--) {
        const sp = state.sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.975;
        sp.vy *= 0.975;
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

      for (let i = state.flares.length - 1; i >= 0; i--) {
        const fl = state.flares[i];
        fl.x += fl.vx;
        fl.y += fl.vy;
        fl.vx *= 0.96;
        fl.vy *= 0.96;
        fl.rot += 0.025;
        fl.life -= fl.decay;
        if (fl.life <= 0) {
          state.flares.splice(i, 1);
          continue;
        }
        drawFourPointStar(fxCtx, fl.x, fl.y, fl.r * (0.4 + fl.life * 0.8), fl.color, fl.life, fl.rot);
      }

      for (let i = state.rings.length - 1; i >= 0; i--) {
        const rg = state.rings[i];
        rg.r += rg.grow || 2.4;
        rg.life = 1 - rg.r / rg.maxR;
        if (rg.life <= 0) {
          state.rings.splice(i, 1);
          continue;
        }
        fxCtx.save();
        fxCtx.globalAlpha = rg.life * 0.72;
        fxCtx.strokeStyle = rg.color;
        fxCtx.shadowColor = rg.color;
        fxCtx.shadowBlur = 10;
        fxCtx.lineWidth = rg.lineWidth || 2;
        fxCtx.beginPath();
        fxCtx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        fxCtx.stroke();
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
  if (initialTheme === 'space') {
    try {
      if (window.name === BIGBANG_FLAG) {
        document.documentElement.classList.add('space-bigbang-prearrive');
      }
    } catch (_) {}
  }
  applyTheme(initialTheme, Boolean(queryTheme), false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountThemeSwitcher);
  } else {
    mountThemeSwitcher();
  }
})();
