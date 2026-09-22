/**
 * UCLA DevX Website Interactive Script
 * Handles word cycler, project showcase switcher, 3D tilt, modal, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 0. Smooth Anchor Navigation (Native Scroll)
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          const headerOffset = 60;
          const elementPosition = targetElem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =========================================================================
  // 1. Dynamic Typewriter with Alternating Blue & Orange Gradient Themes
  // =========================================================================
  const words = [
    { text: 'Entrepreneurs', theme: 'blue' },
    { text: 'Designers', theme: 'orange' },
    { text: 'Developers', theme: 'blue' },
    { text: 'Marketers', theme: 'orange' }
  ];

  let wordIdx = 0;
  let charIdx = words[0].text.length;
  let isDeleting = false;
  const cyclingWordElement = document.getElementById('cycling-word');
  const whoGlowElement = document.getElementById('who-glow');

  function updateTheme(theme) {
    if (cyclingWordElement) {
      if (theme === 'orange') {
        cyclingWordElement.classList.remove('theme-blue');
        cyclingWordElement.classList.add('theme-orange');
      } else {
        cyclingWordElement.classList.remove('theme-orange');
        cyclingWordElement.classList.add('theme-blue');
      }
    }

    if (whoGlowElement) {
      if (theme === 'orange') {
        whoGlowElement.classList.remove('glow-theme-blue');
        whoGlowElement.classList.add('glow-theme-orange');
      } else {
        whoGlowElement.classList.remove('glow-theme-orange');
        whoGlowElement.classList.add('glow-theme-blue');
      }
    }
  }

  function runTypewriter() {
    if (!cyclingWordElement) return;

    const currentItem = words[wordIdx];
    const fullText = currentItem.text;

    updateTheme(currentItem.theme);

    if (isDeleting) {
      charIdx--;
      cyclingWordElement.textContent = fullText.substring(0, charIdx);

      if (charIdx <= 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        updateTheme(words[wordIdx].theme);
        setTimeout(runTypewriter, 300);
        return;
      }
      setTimeout(runTypewriter, 45); // Backspace delete speed
    } else {
      charIdx++;
      cyclingWordElement.textContent = fullText.substring(0, charIdx);

      if (charIdx >= fullText.length) {
        isDeleting = true;
        setTimeout(runTypewriter, 2000); // Pause on completed word
        return;
      }
      setTimeout(runTypewriter, 85); // Typing speed per character
    }
  }

  // Ensure initial theme is applied
  updateTheme(words[0].theme);

  // Start typewriter loop after brief 1.2s initial display
  setTimeout(() => {
    isDeleting = true;
    runTypewriter();
  }, 1200);

  // =========================================================================
  // 2. Interactive Projects Showcase
  // =========================================================================
  const projectDetails = {
    blink: {
      title: "blink",
      caption: "blink, an app to stay on top of UCLA pop-ups",
      image: "assets/project-blink.png"
    },
    chat: {
      title: "UCLA ClassChat",
      caption: "UCLA ClassChat, real-time course collaboration & lecture discussion",
      image: "assets/project-chat.png"
    },
    soundtown: {
      title: "SoundTown",
      caption: "SoundTown, social music tracking and UCLA friend discovery",
      image: "assets/project-soundtown.png"
    }
  };

  const projectCards = document.querySelectorAll('.project-card');
  const projectCaption = document.getElementById('project-caption');
  let currentActiveKey = 'blink';

  function updateProjectShowcase(activeKey) {
    if (activeKey === currentActiveKey) return;
    currentActiveKey = activeKey;

    const keys = ['chat', 'blink', 'soundtown'];
    const activeIdx = keys.indexOf(activeKey);

    // Calculate left, center, right slots
    const leftKey = keys[(activeIdx + 2) % 3];
    const centerKey = activeKey;
    const rightKey = keys[(activeIdx + 1) % 3];

    projectCards.forEach(card => {
      const pKey = card.getAttribute('data-project');
      card.classList.remove('center-card', 'left-card', 'right-card', 'active');

      if (pKey === centerKey) {
        card.classList.add('center-card', 'active');
      } else if (pKey === leftKey) {
        card.classList.add('side-card', 'left-card');
      } else if (pKey === rightKey) {
        card.classList.add('side-card', 'right-card');
      }
    });

    if (projectCaption && projectDetails[activeKey]) {
      projectCaption.style.opacity = '0';
      setTimeout(() => {
        projectCaption.textContent = projectDetails[activeKey].caption;
        projectCaption.style.opacity = '1';
      }, 200);
    }
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pKey = card.getAttribute('data-project');
      updateProjectShowcase(pKey);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pKey = card.getAttribute('data-project');
        updateProjectShowcase(pKey);
      }
    });
  });

  // =========================================================================
  // 3. Hero Section (Interactive X Component handles live canvas particles)
  // =========================================================================

  // =========================================================================
  // 4. Modal Management (Join Application / Recruitment)
  // =========================================================================
  const modal = document.getElementById('join-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const navJoinTrigger = document.getElementById('nav-join-trigger');
  const heroJoinTrigger = document.getElementById('hero-join-trigger');
  const footerJoinLink = document.getElementById('footer-join-link');
  const viewProjectsTrigger = document.getElementById('view-projects-trigger');
  const aboutUsTrigger = document.getElementById('about-us-trigger');

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  const heroStartAppBtn = document.getElementById('hero-start-app-btn');

  if (navJoinTrigger && navJoinTrigger.tagName === 'BUTTON') {
    navJoinTrigger.addEventListener('click', openModal);
  }
  if (heroJoinTrigger) heroJoinTrigger.addEventListener('click', openModal);
  if (heroStartAppBtn && heroStartAppBtn.tagName === 'BUTTON') {
    heroStartAppBtn.addEventListener('click', openModal);
  }
  if (footerJoinLink) footerJoinLink.addEventListener('click', (e) => {
    if (footerJoinLink.getAttribute('href') === '#') {
      e.preventDefault();
      openModal();
    }
  });

  if (viewProjectsTrigger && viewProjectsTrigger.tagName === 'BUTTON') {
    viewProjectsTrigger.addEventListener('click', () => {
      window.location.href = 'projects.html';
    });
  }

  if (aboutUsTrigger && aboutUsTrigger.tagName === 'BUTTON') {
    aboutUsTrigger.addEventListener('click', () => {
      window.location.href = 'about.html';
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Form submission handler
  window.handleFormSubmit = function() {
    const form = document.getElementById('join-form');
    const successMsg = document.getElementById('form-success');
    if (form && successMsg) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          form.reset();
          form.style.display = 'flex';
          successMsg.style.display = 'none';
        }, 400);
      }, 2500);
    }
  };

  // =========================================================================
  // 5. Mobile Menu Toggle
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 6. Smart Auto-Hide Navbar on Scroll (Hide on Down, Reappear on Up)
  // =========================================================================
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  let lastScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const scrollThreshold = 6;

  function handleNavScroll() {
    const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    // Do not hide if mobile dropdown menu is open
    const navLinks = document.getElementById('nav-links');
    if (navLinks && navLinks.classList.contains('mobile-open')) {
      if (navbarWrapper) navbarWrapper.classList.remove('nav-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    // At top of page: always show navbar
    if (currentScrollY <= 60) {
      if (navbarWrapper) navbarWrapper.classList.remove('nav-hidden');
      lastScrollY = Math.max(0, currentScrollY);
      return;
    }

    const diff = currentScrollY - lastScrollY;

    // Ignore tiny scroll movements to avoid jitter
    if (Math.abs(diff) < scrollThreshold) {
      return;
    }

    if (diff > 0 && currentScrollY > 80) {
      // Scrolling down -> hide navbar
      if (navbarWrapper) navbarWrapper.classList.add('nav-hidden');
    } else if (diff < 0) {
      // Scrolling up -> reveal navbar
      if (navbarWrapper) navbarWrapper.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // =========================================================================
  // 7. Navigation Scroll Spy (Active Links) - Only for pages with in-page hash links
  // =========================================================================
  const hasHashNav = document.querySelector('.navbar-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  if (hasHashNav && sections.length > 0) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          let currentSection = '';
          const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) + 200;

          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSection = section.getAttribute('id');
            }
          });

          if (currentSection) {
            allNavLinks.forEach(link => {
              if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
              } else if (link.getAttribute('href')?.startsWith('#')) {
                link.classList.remove('active');
              }
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // =========================================================================
  // 8. DevX Moments Floating Cursor Tooltip (About Us Page)
  // =========================================================================
  const momentsLabel = document.getElementById('moments-cursor-label');
  const momentsItems = document.querySelectorAll('.moments-item[data-moment]');

  if (momentsLabel && momentsItems.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let isInsideMoments = false;
    let rafId = null;

    function updateLabelPosition() {
      if (isInsideMoments) {
        momentsLabel.style.left = `${mouseX}px`;
        momentsLabel.style.top = `${mouseY}px`;
        rafId = requestAnimationFrame(updateLabelPosition);
      }
    }

    momentsItems.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        const text = item.getAttribute('data-moment');
        if (text) {
          momentsLabel.textContent = text;
          momentsLabel.classList.add('active');
          isInsideMoments = true;
          mouseX = e.clientX;
          mouseY = e.clientY;
          momentsLabel.style.left = `${mouseX}px`;
          momentsLabel.style.top = `${mouseY}px`;
          if (!rafId) {
            rafId = requestAnimationFrame(updateLabelPosition);
          }
        }
      });

      item.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      item.addEventListener('mouseleave', () => {
        momentsLabel.classList.remove('active');
        isInsideMoments = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    });
  }

  // =========================================================================
  // 8b. About Us Page: Scroll-Triggered Entrance Animations (Images & Text)
  // =========================================================================
  if (document.body.classList.contains('about-body')) {
    // Eagerly pre-decode images asynchronously to prevent scroll freezing
    document.querySelectorAll('img').forEach((img) => {
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });

    const revealElements = document.querySelectorAll('.about-reveal, .about-reveal-media');

    if (revealElements.length > 0) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.05,
        rootMargin: '120px 0px 40px 0px'
      });

      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    }
  }

  // =========================================================================
  // 9. Projects Page: Top Icon Bar Jump Scrolling
  // =========================================================================
  const projectJumpButtons = document.querySelectorAll('.project-jump-btn[data-target]');

  projectJumpButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      targetSection.classList.add('in-view');
      const targetY = targetSection.offsetTop - 60;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    });
  });

  // =========================================================================
  // 10. Projects Page: Automatic Screen 1 -> 2 -> 3 Cycler (Phone & Laptop)
  // =========================================================================
  const deviceShowcases = document.querySelectorAll('.device-showcase-wrapper[data-project]');

  if (deviceShowcases.length > 0) {
    deviceShowcases.forEach((showcase, index) => {
      const screens = showcase.querySelectorAll('.device-screen-img');
      if (screens.length <= 1) return;

      let currentScreenIndex = 0;

      // Stagger slightly so each device feels lively
      const intervalDelay = 2800;

      setInterval(() => {
        if (document.hidden) return; // Pause when tab is inactive

        screens[currentScreenIndex].classList.remove('active');
        currentScreenIndex = (currentScreenIndex + 1) % screens.length;
        screens[currentScreenIndex].classList.add('active');
      }, intervalDelay);
    });
  }

  // =========================================================================
  // 11. Projects Page: Scroll-Triggered Staggered Section Reveals (Band -> Device -> Text)
  // =========================================================================
  const projectSections = document.querySelectorAll('.project-feature-section');

  if (projectSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.04,
      rootMargin: '0px 0px -2% 0px'
    });

    projectSections.forEach((sec) => {
      sectionObserver.observe(sec);
    });
  }

  // =========================================================================
  // 12. Recruitment Application Countdown Timer (Figma Node 207:602)
  // Applications close October 2, 2026 at 11:59:59 PM PDT (UTC-7)
  // =========================================================================
  const appCountdown = document.getElementById('app-countdown');
  if (appCountdown) {
    const targetDate = new Date('2026-10-02T23:59:59-07:00').getTime();

    function updateCountdown() {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        appCountdown.textContent = 'Applications are now closed for this cycle.';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        appCountdown.textContent = `Applications close in ${days} Days, ${hours} Hours, ${minutes}m, ${seconds}s`;
      } else {
        appCountdown.textContent = `Applications close in ${hours} Hours, ${minutes}m, ${seconds}s`;
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // =========================================================================
  // 13. Footer Top Border Pixel Band (Interactive Blue ASCII / Pixel Shimmer)
  // Matching the Hero X simmering particle effect along the top of the footer
  // =========================================================================
  const footerElem = document.querySelector('.site-footer');
  if (footerElem) {
    let band = footerElem.querySelector('.footer-pixel-band');
    if (!band) {
      band = document.createElement('div');
      band.className = 'footer-pixel-band';
      band.setAttribute('aria-hidden', 'true');
      footerElem.insertBefore(band, footerElem.firstChild);
    }

    let cvs = band.querySelector('canvas');
    if (!cvs) {
      cvs = document.createElement('canvas');
      cvs.className = 'footer-pixel-canvas';
      band.appendChild(cvs);
    }

    const ctx = cvs.getContext('2d');
    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');

    const GLYPHS = ['0', '1', '+', '-', '=', '/', '\\', '|', '<', '>', '#', ':', '*', '~', '^'];
    const CELL_SIZE = 7; // CSS pixels per cell
    let W = 0, H = 0, dpr = 1, cols = 0, rows = 1, cells = [];
    let running = false, raf = 0, last = 0, t = 0, isVisible = true;
    let grad = null, gradW = 0;
    const ptr = { on: false, x: 0, y: 0, R: 100 };

    // Pre-rendered glyph atlas for high-performance stamping
    let atlas = null;
    function makeAtlas(cellPx) {
      atlas = document.createElement('canvas');
      atlas.width = GLYPHS.length * cellPx;
      atlas.height = cellPx;
      const a = atlas.getContext('2d');
      a.fillStyle = '#ffffff';
      a.textAlign = 'center';
      a.textBaseline = 'middle';
      a.font = `700 ${Math.round(cellPx * 0.92)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      GLYPHS.forEach((ch, k) => a.fillText(ch, k * cellPx + cellPx / 2, cellPx * 0.52));
    }

    function build() {
      const rect = band.getBoundingClientRect();
      const w = rect.width || footerElem.clientWidth || window.innerWidth;
      const h = rect.height || 8;
      if (!w) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.round(w * dpr);
      H = Math.round(h * dpr);
      cvs.width = W;
      cvs.height = H;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;

      const cellPx = Math.max(5, Math.round(CELL_SIZE * dpr));
      cols = Math.ceil(W / cellPx);
      rows = Math.max(1, Math.floor(H / cellPx));
      makeAtlas(cellPx);

      cells = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const r = Math.random();
          // 40% bits (0/1), 30% ascii glyphs, 30% solid micro pixel blocks
          const kind = r < 0.40 ? 0 : r < 0.70 ? 1 : 2;
          const g = kind === 0 ? (Math.random() < 0.5 ? 0 : 1)
                  : kind === 1 ? 2 + Math.floor(Math.random() * (GLYPHS.length - 2))
                  : -1;
          cells.push({
            i, j,
            kind,
            g,
            sp: 0.9 + Math.random() * 1.8,
            ph: Math.random() * Math.PI * 2,
            baseAlpha: 0.22 + Math.random() * 0.50,
            heat: 0
          });
        }
      }
      grad = null;
    }

    function draw(now, dt) {
      if (!W || !H || !cells.length) return;
      ctx.clearRect(0, 0, W, H);

      const cellPx = Math.max(5, Math.round(CELL_SIZE * dpr));
      const pxSize = Math.max(1, Math.round(cellPx * 0.8));
      const pxOff = (cellPx - pxSize) >> 1;
      const decay = Math.pow(0.85, dt * 60);

      for (let n = 0; n < cells.length; n++) {
        const c = cells[n];
        c.heat *= decay;

        if (ptr.on) {
          const cx = (c.i + 0.5) * cellPx;
          const cy = (c.j + 0.5) * cellPx;
          const dist = Math.hypot(cx - ptr.x, cy - ptr.y);
          if (dist < ptr.R * dpr) {
            const f = 1 - dist / (ptr.R * dpr);
            if (f > c.heat) c.heat = f;
          }
        }

        const pulse = 0.5 + 0.5 * Math.sin(now * c.sp + c.ph);
        if (pulse > 0.93 && Math.random() < 0.08) {
          if (c.kind === 0) c.g = Math.random() < 0.5 ? 0 : 1;
          else if (c.kind === 1) c.g = 2 + Math.floor(Math.random() * (GLYPHS.length - 2));
        }

        let a = c.baseAlpha * (0.65 + 0.35 * pulse) + c.heat * 0.55;
        if (a > 1) a = 1;
        if (a < 0.04) continue;

        const x = c.i * cellPx;
        const y = c.j * cellPx;

        ctx.globalAlpha = a;
        if (c.g < 0) {
          ctx.fillRect(x + pxOff, y + pxOff, pxSize, pxSize);
        } else {
          ctx.drawImage(atlas, c.g * cellPx, 0, cellPx, cellPx, x, y, cellPx, cellPx);
        }
      }

      // DevX Electric Blue gradient overlay matching Hero X
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-in';
      if (!grad || gradW !== W) {
        gradW = W;
        grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0.00, '#3875f6');
        grad.addColorStop(0.15, '#437ffe');
        grad.addColorStop(0.35, '#5b8bfb');
        grad.addColorStop(0.50, '#7da7fd');
        grad.addColorStop(0.65, '#5b8bfb');
        grad.addColorStop(0.85, '#437ffe');
        grad.addColorStop(1.00, '#3875f6');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }

    function loop(ms) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (ms - last) / 1000 || 0.016);
      last = ms;
      t += dt;
      draw(t, dt);
    }

    function start() {
      if (running || mqReduce.matches || !isVisible) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    footerElem.addEventListener('pointerenter', () => { ptr.on = true; }, { passive: true });
    footerElem.addEventListener('pointerleave', () => { ptr.on = false; }, { passive: true });
    footerElem.addEventListener('pointermove', (e) => {
      ptr.on = true;
      const rect = cvs.getBoundingClientRect();
      ptr.x = (e.clientX - rect.left) * dpr;
      ptr.y = (e.clientY - rect.top) * dpr;
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) start();
          else stop();
        });
      }, { threshold: 0.01 });
      observer.observe(footerElem);
    } else {
      start();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        draw(t, 0.016);
      }, 100);
    }, { passive: true });

    build();
    draw(0, 0.016);
    start();
  }

});

