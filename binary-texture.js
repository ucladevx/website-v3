/**
 * UCLA DevX - Subtle Binary Texture Fields
 * Gentle simmering '0' and '1' digital grain texture for section backgrounds.
 * Designed to be barely lighter than the background color as an atmospheric texture.
 */
(() => {
  'use strict';

  const CFG = {
    cellD:     12,    // character spacing in CSS pixels
    simmer:    0.45,  // slow, organic breathing speed matching the Hero X
    radius:    70,    // subtle hover reaction radius in px
    baseAlpha: 0.052  // very subtle base opacity, just slightly lighter than #141519
  };

  const G = ['0', '1'];

  function initField(host) {
    let cvs = host.querySelector('canvas');
    if (!cvs) {
      cvs = document.createElement('canvas');
      cvs.setAttribute('aria-hidden', 'true');
      host.appendChild(cvs);
    }

    const ctx = cvs.getContext('2d');
    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
    const ptr = { on: false, x: 0, y: 0, tx: 0, ty: 0, R: CFG.radius };

    let dpr = 1, cellPx = 12, cols = 0, rows = 0, W = 0, H = 0;
    let cells = [], heat, atlas, colW, rowW;
    let running = false, raf = 0, last = 0, t = Math.random() * 10, visible = false;

    // Detect if this field sits behind a button/CTA (e.g. Hero Join button)
    const cta = host.closest('.hero-cta');
    const ctaBtn = cta ? cta.querySelector('.btn') : null;
    let ctaHovered = false;
    let ctaIntensity = 0;

    if (cta) {
      const onEnter = () => { ctaHovered = true; };
      const onLeave = () => { ctaHovered = false; };
      cta.addEventListener('pointerenter', onEnter, { passive: true });
      cta.addEventListener('pointerleave', onLeave, { passive: true });
      if (ctaBtn) {
        ctaBtn.addEventListener('pointerenter', onEnter, { passive: true });
        ctaBtn.addEventListener('pointerleave', onLeave, { passive: true });
        ctaBtn.addEventListener('focus', onEnter, { passive: true });
        ctaBtn.addEventListener('blur', onLeave, { passive: true });
      }
    }

    function makeAtlas() {
      atlas = document.createElement('canvas');
      atlas.width = G.length * cellPx;
      atlas.height = cellPx;
      const a = atlas.getContext('2d');
      a.fillStyle = '#ffffff';
      a.textAlign = 'center';
      a.textBaseline = 'middle';
      a.font = `600 ${Math.round(cellPx * 0.72)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      G.forEach((ch, k) => a.fillText(ch, k * cellPx + cellPx / 2, cellPx * 0.54));
    }

    function build() {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cellPx = Math.round(CFG.cellD * dpr);
      W = Math.round(w * dpr);
      H = Math.round(h * dpr);

      cvs.width = W;
      cvs.height = H;
      cvs.style.width = w + 'px';
      cvs.style.height = h + 'px';

      cols = Math.ceil(W / cellPx);
      rows = Math.ceil(H / cellPx);
      ptr.R = CFG.radius * dpr;
      makeAtlas();

      heat = new Float32Array(cols * rows);
      colW = new Float32Array(cols);
      rowW = new Float32Array(rows);
      cells = [];

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          cells.push({
            i, j, idx,
            x: i * cellPx,
            y: j * cellPx,
            lvl: 0.7 + Math.random() * 0.3,
            ph: Math.random() * 6.2832,
            sp: 0.5 + Math.random() * 1.0,
            g: Math.random() < 0.5 ? 0 : 1,
            sw: false,
            hb: Math.random() < 0.5 ? 0 : 1,
            hr: 0,
            hbNext: 0
          });
        }
      }
    }

    function draw(now, dt, live) {
      const S = CFG.simmer;
      ctx.clearRect(0, 0, W, H);

      if (live && ptr.on) {
        const dec = dt * 2.0;
        for (let k = 0; k < heat.length; k++) {
          const v = heat[k];
          if (v > 0) heat[k] = v > dec ? v - dec : 0;
        }

        const R = ptr.R;
        const i0 = Math.max(0, ((ptr.x - R) / cellPx) | 0);
        const i1 = Math.min(cols - 1, ((ptr.x + R) / cellPx) | 0);
        const j0 = Math.max(0, ((ptr.y - R) / cellPx) | 0);
        const j1 = Math.min(rows - 1, ((ptr.y + R) / cellPx) | 0);

        for (let j = j0; j <= j1; j++) {
          for (let i = i0; i <= i1; i++) {
            const d = Math.hypot((i + 0.5) * cellPx - ptr.x, (j + 0.5) * cellPx - ptr.y);
            if (d >= R) continue;
            let f = 1 - d / R;
            f = f * f * (3 - 2 * f);
            const k = j * cols + i;
            if (f > heat[k]) heat[k] = f;
          }
        }
      } else if (live) {
        const dec = dt * 2.0;
        for (let k = 0; k < heat.length; k++) {
          const v = heat[k];
          if (v > 0) heat[k] = v > dec ? v - dec : 0;
        }
      }

      // Smoothly ramp CTA hover brightness
      if (cta) {
        const target = ctaHovered ? 1.0 : 0.0;
        ctaIntensity += (target - ctaIntensity) * Math.min(1, dt * 5.0);
      }

      for (let i = 0; i < cols; i++) colW[i] = Math.sin(i * 0.12 + now * 0.3 * S);
      for (let j = 0; j < rows; j++) rowW[j] = Math.sin(j * 0.09 - now * 0.25 * S);

      for (let n = 0; n < cells.length; n++) {
        const c = cells[n];

        // Organic simmering dip
        const th = 0.50 + 0.22 * colW[c.i] * rowW[c.j];
        const s = Math.sin(now * c.sp * S + c.ph);
        let dip = (s - th) / (1 - th);
        dip = dip < 0 ? 0 : dip;
        dip = dip * dip * (3 - 2 * dip);

        if (dip > 0.90 && !c.sw) {
          c.sw = true;
          c.g = Math.random() < 0.5 ? 0 : 1;
        } else if (dip < 0.3) {
          c.sw = false;
        }

        // Subtly lighter than the dark background
        let a = c.lvl * CFG.baseAlpha * (1 - 0.45 * dip);
        let g = c.g;

        // Subtle ambient lighting up when Join button is hovered ("subtlety is key")
        if (ctaIntensity > 0.005) {
          a += 0.038 * ctaIntensity;
        }

        const h = heat[c.idx];
        if (h > 0.02) {
          if (now > c.hbNext) {
            c.hb = Math.random() < 0.5 ? 0 : 1;
            c.hr = Math.random();
            c.hbNext = now + 0.03 + Math.random() * 0.05;
          }
          a += 0.045 * h; // gentle whisper of brightness under cursor
          if (h > 0.15) g = c.hb;
        }

        if (a < 0.005) continue;
        ctx.globalAlpha = Math.min(0.20, a);
        ctx.drawImage(atlas, g * cellPx, 0, cellPx, cellPx, c.x, c.y, cellPx, cellPx);
      }
      ctx.globalAlpha = 1;
    }

    function loop(ms) {
      if (!running || !visible) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (ms - last) / 1000 || 0.016);
      last = ms;
      t += dt;

      const k = Math.min(1, dt * 18);
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;
      draw(t, dt, true);
    }

    function start() {
      if (running || mqReduce.matches || !visible) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function refresh() {
      build();
      if (mqReduce.matches) draw(7, 0, false);
    }

    // Local pointer tracking over this patch
    host.addEventListener('pointermove', e => {
      if (mqReduce.matches) return;
      const r = cvs.getBoundingClientRect();
      const x = (e.clientX - r.left) * dpr;
      const y = (e.clientY - r.top) * dpr;
      if (x >= 0 && y >= 0 && x <= W && y <= H) {
        if (!ptr.on) { ptr.x = x; ptr.y = y; }
        ptr.tx = x; ptr.ty = y; ptr.on = true;
      } else {
        ptr.on = false;
      }
    }, { passive: true });

    host.addEventListener('pointerleave', () => { ptr.on = false; }, { passive: true });

    // Lifecycle
    let rz = 0;
    new ResizeObserver(() => {
      clearTimeout(rz);
      rz = setTimeout(refresh, 100);
    }).observe(host);

    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    }, { rootMargin: '100px' }).observe(host);

    mqReduce.addEventListener('change', () => {
      mqReduce.matches ? (stop(), refresh()) : start();
    });

    build();
    mqReduce.matches ? draw(7, 0, false) : start();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.binary-field').forEach(initField);
  });
})();
