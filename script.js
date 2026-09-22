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

});

