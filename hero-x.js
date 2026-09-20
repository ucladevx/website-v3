/**
 * UCLA DevX - Interactive X Glyph Field Component
 * Live simmering ASCII/matrix particle canvas for Hero Section
 */
(() => {
  'use strict';

  /* ───────────── settings ───────────── */
  const CFG = {
    cols:      100,   // characters across the graphic (higher = finer, denser)
    minCell:   5,     // smallest character size in CSS px (keeps mobile legible)
    bleed:     0.32,  // generous room around graphic so pixels disperse across screen without clipping
    threshold: 0.12,  // how much ink a cell needs to become part of the shape
    simmer:    0.45,  // idle speed: slower, gentle organic breathing
    radius:    0.11,  // hover radius, as a fraction of the graphic's width (contained around mouse)
    scatter:   0,     // stay strictly in place, no stray bits thrown off
    ascii:     '+-=/\\|<>#:*~^[]{};%$@?'   // the non-binary characters in the mix
  };

  const G = ['0', '1', ...CFG.ascii.split('')];      // glyph 0/1 = bits, 2+ = ascii

  // small deterministic hash → 0..1 (used for per-row glitch + stray bits)
  function hash(a, b) {
    let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function init(host) {
    const img = host.querySelector('img');
    const cvs = host.querySelector('canvas');
    if (!img || !cvs) return;

    const ctx = cvs.getContext('2d');
    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
    const ptr = { on: false, x: 0, y: 0, tx: 0, ty: 0, R: 0 };

    let src = null;                                   // downsampled ink mask of the image
    let dpr = 1, cellD = 8, cols = 0, rows = 0, W = 0, H = 0, ink = '#437ffe';
    let cells = [], isAct, near, heat, atlas, colW, rowW;
    let running = false, raf = 0, last = 0, t = 0, visible = true;
    let grad = null, gradW = 0, gradH = 0;

    /* ── read the image into a single 0-255 "ink" channel ── */
    function readSource() {
      const sw = Math.min(img.naturalWidth, 1400);
      const sh = Math.round(sw * img.naturalHeight / img.naturalWidth);
      const c = document.createElement('canvas');
      c.width = sw; c.height = sh;
      const x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0, sw, sh);
      const d = x.getImageData(0, 0, sw, sh).data;
      let hasAlpha = false;
      for (let i = 3; i < d.length; i += 4) {
        if (d[i] < 200) { hasAlpha = true; break; }
      }
      const mask = new Uint8Array(sw * sh);
      for (let p = 0, o = 0; p < mask.length; p++, o += 4) {
        mask[p] = hasAlpha ? d[o + 3] : 255 - (0.299 * d[o] + 0.587 * d[o + 1] + 0.114 * d[o + 2]);
      }
      src = { mask, w: sw, h: sh };
    }

    /* ── glyph atlas: every character pre-drawn once, then stamped with drawImage ── */
    function makeAtlas() {
      atlas = document.createElement('canvas');
      atlas.width = G.length * cellD; atlas.height = cellD;
      const a = atlas.getContext('2d');
      a.fillStyle = '#ffffff'; a.textAlign = 'center'; a.textBaseline = 'middle';
      a.font = `700 ${cellD}px ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`;
      G.forEach((ch, k) => a.fillText(ch, k * cellD + cellD / 2, cellD * 0.56));
    }

    const pickKind = () => { const r = Math.random(); return r < 0.42 ? 0 : r < 0.64 ? 1 : 2; };
    const glyphFor = k => k === 0 ? (Math.random() < 0.5 ? 0 : 1)
                        : k === 1 ? 2 + ((Math.random() * (G.length - 2)) | 0) : -1;
    const reroll = c => { if (Math.random() < 0.25) c.kind = pickKind(); c.g = glyphFor(c.kind); };

    /* ── turn the image into a grid of living cells ── */
    let hasMaterialized = false;
    let isExiting = false;
    let exitStart = 0;

    function build() {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h || !src) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cellD = Math.max(3, Math.round(Math.max(CFG.minCell, w / CFG.cols) * dpr));
      const wD = Math.round(w * dpr), hD = Math.round(h * dpr);
      const bleedD = Math.round(w * CFG.bleed * dpr);
      W = wD + bleedD * 2; H = hD + bleedD * 2;

      cvs.width = W; cvs.height = H;
      cvs.style.width = W / dpr + 'px'; cvs.style.height = H / dpr + 'px';
      cvs.style.left = -bleedD / dpr + 'px'; cvs.style.top = -bleedD / dpr + 'px';

      cols = Math.ceil(W / cellD); rows = Math.ceil(H / cellD);
      ptr.R = CFG.radius * wD;
      grad = null;
      makeAtlas();

      const xs = wD / src.w, ys = hD / src.h;
      const cx = new Int32Array(src.w), cy = new Int32Array(src.h);
      for (let x = 0; x < src.w; x++) cx[x] = Math.floor((bleedD + (x + 0.5) * xs) / cellD);
      for (let y = 0; y < src.h; y++) cy[y] = Math.floor((bleedD + (y + 0.5) * ys) / cellD);
      const acc = new Float32Array(cols * rows);
      for (let y = 0; y < src.h; y++) {
        const row = cy[y] * cols, o = y * src.w;
        for (let x = 0; x < src.w; x++) { const v = src.mask[o + x]; if (v) acc[row + cx[x]] += v; }
      }
      const area = (cellD / xs) * (cellD / ys) * 255;

      isAct = new Uint8Array(cols * rows);
      near  = new Float32Array(cols * rows);
      heat  = new Float32Array(cols * rows);
      colW  = new Float32Array(cols); rowW = new Float32Array(rows);
      cells = [];

      const shouldMaterialize = !hasMaterialized && !mqReduce.matches;

      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const idx = j * cols + i, cov = Math.min(1, 1.5 * acc[idx] / area);
        if (cov < CFG.threshold) continue;
        const kind = pickKind();

        let dx = 0, dy = 0, vx = 0, vy = 0;
        let startX = 0, startY = 0;
        let seekDelay = 0, seekDuration = 0, curl = 0;
        let locked = true;

        if (shouldMaterialize) {
          // Particles start dispersed across a wide area around the graphic
          const angle = Math.random() * 6.283185;
          const dist = (120 + Math.pow(Math.random(), 0.75) * 650) * dpr;
          startX = Math.cos(angle) * dist;
          startY = Math.sin(angle) * dist;
          dx = startX;
          dy = startY;

          // Staggered delay: particles gradually find their places into the X
          // Rolling cascade from 0.15s to ~2.6s, with individual flight times
          const jitter = Math.random() * 1.5;
          const distFactor = (dist / (750 * dpr)) * 0.9;
          seekDelay = 0.15 + distFactor + jitter;
          seekDuration = 0.85 + Math.random() * 0.55;
          curl = (Math.random() - 0.5) * 85 * dpr;
          locked = false;
        }

        cells.push({
          i, j, idx,
          ox: i * cellD, oy: j * cellD,
          dx, dy, vx, vy,
          startX, startY,
          seekDelay, seekDuration, curl,
          locked, settled: locked,
          cov,
          lvl: 0.6 + Math.random() * 0.4,
          ph: Math.random() * 6.2832,
          sp: 0.5 + Math.random() * 1.1,
          kind, g: glyphFor(kind), sw: false,
          hb: 0, hr: 0, hbNext: 0, thr: 0.05 + Math.random() * 0.45
        });
        isAct[idx] = 1;
      }
      if (shouldMaterialize) {
        hasMaterialized = true;
      }
      for (const c of cells) for (let dj = -3; dj <= 3; dj++) for (let di = -3; di <= 3; di++) {
        const ii = c.i + di, jj = c.j + dj;
        if (ii < 0 || jj < 0 || ii >= cols || jj >= rows) continue;
        const v = 1 - Math.hypot(di, dj) / 4, k = jj * cols + ii;
        if (v > near[k]) near[k] = v;
      }
    }

    /* ── one frame ── */
    function draw(now, dt, live) {
      const S = CFG.simmer;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff';

      if (live) {
        const dec = dt * 1.7;
        for (let k = 0; k < heat.length; k++) { const v = heat[k]; if (v > 0) heat[k] = v > dec ? v - dec : 0; }
        if (ptr.on) {
          const R = ptr.R;
          const i0 = Math.max(0, ((ptr.x - R) / cellD) | 0), i1 = Math.min(cols - 1, ((ptr.x + R) / cellD) | 0);
          const j0 = Math.max(0, ((ptr.y - R) / cellD) | 0), j1 = Math.min(rows - 1, ((ptr.y + R) / cellD) | 0);
          for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
            const d = Math.hypot((i + 0.5) * cellD - ptr.x, (j + 0.5) * cellD - ptr.y);
            if (d >= R) continue;
            let f = 1 - d / R; f = f * f * (3 - 2 * f);
            const k = j * cols + i; if (f > heat[k]) heat[k] = f;
          }
        }
      }

      const step = Math.floor(now * 16);
      for (let i = 0; i < cols; i++) colW[i] = Math.sin(i * 0.09 + now * 0.35 * S);
      for (let j = 0; j < rows; j++) rowW[j] = Math.sin(j * 0.07 - now * 0.28 * S);

      const pxSize = Math.max(1, Math.round(cellD * 0.78)), pxOff = (cellD - pxSize) >> 1;

      let exitProgress = 0;
      let exitAlpha = 1;
      if (isExiting) {
        const exitElapsed = (performance.now() - exitStart) / 1000;
        exitProgress = Math.min(1, exitElapsed / 0.44);
        exitAlpha = Math.max(0, 1 - Math.pow(exitProgress, 1.4));
      }

      for (let n = 0; n < cells.length; n++) {
        const c = cells[n];

        if (isExiting) {
          // Disperse outward explosively when exiting page
          c.dx += c.vx * dt;
          c.dy += c.vy * dt;
          c.vx *= Math.pow(0.93, dt * 60);
          c.vy *= Math.pow(0.93, dt * 60);
          if (Math.random() < 0.2) c.g = glyphFor(c.kind);
        } else if (!c.locked) {
          if (now < c.seekDelay) {
            // Ambient floating drift before seeking home
            const drift = now * 1.6 + c.ph;
            c.dx = c.startX + Math.cos(drift) * 8 * dpr;
            c.dy = c.startY + Math.sin(drift) * 8 * dpr;
            if (Math.random() < 0.02) c.g = glyphFor(c.kind);
          } else {
            // Gradually seeking and homing into its exact spot in the X
            const elapsed = now - c.seekDelay;
            const p = Math.min(1, elapsed / c.seekDuration);
            // Smooth cubic ease in-out
            const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

            // Lateral curve arc
            const arc = Math.sin(p * Math.PI) * c.curl * (1 - p * 0.5);
            const norm = Math.hypot(c.startX, c.startY) || 1;
            const perpX = -c.startY / norm;
            const perpY = c.startX / norm;

            c.dx = c.startX * (1 - ease) + perpX * arc;
            c.dy = c.startY * (1 - ease) + perpY * arc;

            // Scramble glyphs while moving
            if (p < 0.96 && Math.random() < 0.15) {
              c.g = glyphFor(c.kind);
            }

            if (p >= 1) {
              c.dx = 0;
              c.dy = 0;
              c.locked = true;
              c.settled = true;
              reroll(c);
            }
          }
        }

        // subtle, calm simmer breathing
        const th = 0.50 + 0.22 * colW[c.i] * rowW[c.j];
        const s = Math.sin(now * c.sp * S + c.ph);
        let dip = (s - th) / (1 - th); dip = dip < 0 ? 0 : dip; dip = dip * dip * (3 - 2 * dip);
        if (dip > 0.90) { if (!c.sw) { c.sw = true; reroll(c); } }
        else if (dip < 0.3) c.sw = false;

        let a = c.lvl * (0.60 + 0.40 * Math.sqrt(c.cov)) * (1 - 0.45 * dip);
        // Softly ramp in during initial 0.55s so scattered cloud fades in gracefully
        if (now < 0.55) {
          a *= Math.min(1, Math.max(0.12, now / 0.50));
        }
        if (isExiting) {
          a *= exitAlpha;
        }
        let x = c.ox + c.dx, y = c.oy + c.dy, g = c.g;

        const h = heat[c.idx];
        if (h > 0.02) {
          if (now > c.hbNext) {
            // Rapidly switch between bits (0/1) and ASCII glyphs in place
            const rKind = Math.random();
            if (rKind < 0.55) {
              c.hb = Math.random() < 0.5 ? 0 : 1;
            } else {
              c.hb = 2 + ((Math.random() * (G.length - 2)) | 0);
            }
            c.hr = Math.random();
            c.hbNext = now + 0.02 + Math.random() * 0.04; // rapid ~30ms flip
          }
          a += (0.4 + 0.6 * c.hr - a) * h;
          if (h > c.thr) g = c.hb;
        }

        if (a < 0.02) continue;
        ctx.globalAlpha = a;
        if (g < 0) ctx.fillRect(x + pxOff, y + pxOff, pxSize, pxSize);
        else ctx.drawImage(atlas, g * cellD, 0, cellD, cellD, x, y, cellD, cellD);
      }

      // Apply smooth gradient: DevX Electric Blue transitioning to a lighter, more faded blue at top-right
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-in';
      if (!grad || gradW !== W || gradH !== H) {
        gradW = W; gradH = H;
        // Direction: from center-left across diagonal towards the top-right wing
        grad = ctx.createLinearGradient(W * 0.28, H * 0.72, W * 0.88, H * 0.08);
        grad.addColorStop(0.00, '#437ffe'); // Classic DevX Electric Blue
        grad.addColorStop(0.38, '#437ffe'); // Pure blue across lower wing, left wing, and center
        grad.addColorStop(0.58, '#5b8bfb'); // Soft transition begins
        grad.addColorStop(0.72, '#7da7fd'); // Airy sky blue
        grad.addColorStop(0.85, '#a4c5fd'); // Light, faded soft blue
        grad.addColorStop(1.00, '#cce0ff'); // Lighter, delicate faded ice blue at the top-right apex
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }

    /* ── loop ── */
    function loop(ms) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (ms - last) / 1000 || 0.016); last = ms; t += dt;
      const k = Math.min(1, dt * 20);
      ptr.x += (ptr.tx - ptr.x) * k; ptr.y += (ptr.ty - ptr.y) * k;
      draw(t, dt, true);
    }
    function start() {
      if (running || mqReduce.matches || !visible) return;
      running = true; last = performance.now(); raf = requestAnimationFrame(loop);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }
    function refresh() { build(); if (mqReduce.matches) draw(7, 0, false); }

    /* ── pointer ── */
    window.addEventListener('pointermove', e => {
      if (mqReduce.matches) return;
      const r = cvs.getBoundingClientRect();
      const x = (e.clientX - r.left) * (W / r.width), y = (e.clientY - r.top) * (H / r.height);
      if (x >= 0 && y >= 0 && x <= W && y <= H) {
        if (!ptr.on) { ptr.x = x; ptr.y = y; }
        ptr.tx = x; ptr.ty = y; ptr.on = true;
      } else ptr.on = false;
    }, { passive: true });

    const off = () => { ptr.on = false; };
    window.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') off(); });
    window.addEventListener('pointercancel', off);
    window.addEventListener('blur', off);
    document.documentElement.addEventListener('mouseleave', off);

    /* ── page exit disperse transition ── */
    function isXOnScreen() {
      const r = host.getBoundingClientRect();
      return r.bottom > 80 && r.top < window.innerHeight && host.offsetParent !== null;
    }

    function triggerDisperseExit(targetUrl) {
      if (isExiting) return;
      isExiting = true;
      exitStart = performance.now();

      const centerX = W * 0.55;
      const centerY = H * 0.48;

      for (let n = 0; n < cells.length; n++) {
        const c = cells[n];
        c.locked = false;
        const curX = c.ox + c.dx;
        const curY = c.oy + c.dy;
        const dx = curX - centerX;
        const dy = curY - centerY;
        const baseAngle = Math.atan2(dy, dx);
        const angle = baseAngle + (Math.random() - 0.5) * 1.3;
        const speed = (550 + Math.random() * 1100) * dpr;
        c.vx = Math.cos(angle) * speed;
        c.vy = Math.sin(angle) * speed;
        reroll(c);
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 430);
    }

    document.addEventListener('click', e => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = e.target.closest('a');
      if (!link) return;

      // Do not intercept modal triggers or anchor hashes
      if (link.id === 'nav-join-trigger' || link.id === 'hero-join-trigger' || link.id === 'footer-join-link') return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (link.target === '_blank') return;

      let url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) { return; }

      // Must be same-origin internal page navigation
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      // Only if the X is currently on the screen!
      if (isXOnScreen()) {
        e.preventDefault();
        triggerDisperseExit(link.href);
      }
    }, false);

    window.addEventListener('pageshow', e => {
      if (e.persisted) {
        isExiting = false;
        hasMaterialized = false;
        t = 0;
        build();
      }
    });

    window.__rematerialize = () => {
      isExiting = false;
      hasMaterialized = false;
      t = 0;
      build();
    };

    /* ── lifecycle ── */
    let rz = 0;
    new ResizeObserver(() => { clearTimeout(rz); rz = setTimeout(refresh, 100); }).observe(host);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(host);
    mqReduce.addEventListener('change', () => { mqReduce.matches ? (stop(), refresh()) : start(); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (src) { makeAtlas(); if (mqReduce.matches) draw(7, 0, false); }
    });

    function ready() {
      try { readSource(); }
      catch (err) { console.warn('X glyph field: could not read image', err); return; }
      t = 0;
      build();
      host.classList.add('is-live');
      mqReduce.matches ? draw(7, 0, false) : start();
    }
    img.complete && img.naturalWidth ? ready() : img.addEventListener('load', ready, { once: true });
  }

  function initAll() {
    document.querySelectorAll('.xfx').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
