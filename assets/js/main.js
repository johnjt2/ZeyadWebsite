(function () {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeText = document.querySelector('.theme-toggle__text');
  const themeIcon = document.querySelector('.theme-toggle__icon');
  const languageToggle = document.querySelector('.language-toggle');
  const languageText = document.querySelector('.language-toggle__text');
  const translatableElements = document.querySelectorAll('.js-translate');
  const placeholderElements = document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]');
  const workoutTabs = document.querySelectorAll('.workout-tab');
  const workoutPdf = document.querySelector('#workoutPdf');
  const packageButtons = document.querySelectorAll('.package-toggle__btn');
  const packagePanels = document.querySelectorAll('[data-package-panel]');
  const branchTabs = document.querySelectorAll('.branch-tab');
  const branchPanels = document.querySelectorAll('[data-branch-panel]');
  const counters = document.querySelectorAll('[data-counter]');
  const year = document.querySelector('#currentYear');
  const certLogoTrack = document.querySelector('.cert-logo-track');

  const savedTheme = localStorage.getItem('zeyad-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    html.setAttribute('data-theme', savedTheme);
  }

  let currentLanguage = localStorage.getItem('zeyad-language') || 'en';

  function updateThemeButton() {
    const isLight = html.getAttribute('data-theme') === 'light';
    const languageKey = currentLanguage === 'ar' ? 'Ar' : 'En';

    if (themeText) {
      const textKey = isLight ? 'themeDark' + languageKey : 'themeLight' + languageKey;
      themeText.textContent = themeText.dataset[textKey] || (isLight ? 'Dark' : 'Light');
    }

    if (themeIcon) themeIcon.textContent = isLight ? '☾' : '☀';
  }

  function applyLanguage(language) {
    currentLanguage = language === 'ar' ? 'ar' : 'en';

    html.setAttribute('lang', currentLanguage);
    html.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');

    translatableElements.forEach(function (element) {
      const text = currentLanguage === 'ar' ? element.dataset.ar : element.dataset.en;
      if (text) element.textContent = text;
    });

    placeholderElements.forEach(function (element) {
      const placeholder = currentLanguage === 'ar' ? element.dataset.placeholderAr : element.dataset.placeholderEn;
      if (placeholder) element.setAttribute('placeholder', placeholder);
    });

    if (languageText) languageText.textContent = currentLanguage === 'ar' ? 'EN' : 'AR';
    if (languageToggle) languageToggle.setAttribute('aria-label', currentLanguage === 'ar' ? 'Switch to English' : 'Switch to Arabic');

    localStorage.setItem('zeyad-language', currentLanguage);
    updateThemeButton();
  }

  applyLanguage(currentLanguage);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = html.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('zeyad-theme', nextTheme);
      updateThemeButton();
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', function () {
      applyLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
    });
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      body.classList.remove('nav-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  workoutTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      workoutTabs.forEach(function (item) { item.classList.remove('is-active'); });
      tab.classList.add('is-active');

      const pdfPath = tab.getAttribute('data-pdf');
      if (workoutPdf && pdfPath) {
        workoutPdf.setAttribute('data', pdfPath);
      }
    });
  });

  packageButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const selected = button.getAttribute('data-package');

      packageButtons.forEach(function (item) { item.classList.remove('is-active'); });
      packagePanels.forEach(function (panel) { panel.classList.remove('is-active'); });

      button.classList.add('is-active');
      const activePanel = document.querySelector('[data-package-panel="' + selected + '"]');
      if (activePanel) activePanel.classList.add('is-active');
    });
  });



  function setupCertificationLoop() {
    if (!certLogoTrack) return;

    const carousel = certLogoTrack.closest('.cert-logo-carousel');
    const originalCards = Array.from(certLogoTrack.querySelectorAll('.cert-logo-card:not([aria-hidden="true"])'));

    if (!carousel || originalCards.length === 0) return;

    // Remove previously generated clones so recalculation on resize stays clean.
    certLogoTrack.querySelectorAll('.cert-logo-card[aria-hidden="true"]').forEach(function (clone) {
      clone.remove();
    });

    const cloneOriginalSet = function () {
      originalCards.forEach(function (card) {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        const image = clone.querySelector('img');
        if (image) image.setAttribute('alt', '');
        certLogoTrack.appendChild(clone);
      });
    };

    cloneOriginalSet();

    // Keep adding repeated sets until the track is long enough to cover wide screens.
    while (certLogoTrack.scrollWidth < carousel.offsetWidth * 2 && certLogoTrack.children.length < originalCards.length * 6) {
      cloneOriginalSet();
    }

    const firstClone = certLogoTrack.querySelector('.cert-logo-card[aria-hidden="true"]');
    if (firstClone) {
      certLogoTrack.style.setProperty('--cert-loop-distance', firstClone.offsetLeft + 'px');
    }
  }

  branchTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const selected = tab.getAttribute('data-branch');

      branchTabs.forEach(function (item) {
        const isSelected = item === tab;
        item.classList.toggle('is-active', isSelected);
        item.setAttribute('aria-selected', String(isSelected));
      });

      branchPanels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-branch-panel') === selected);
      });
    });
  });

  setupCertificationLoop();
  window.addEventListener('resize', setupCertificationLoop);

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('section[id]').forEach(function (section) {
    sectionObserver.observe(section);
  });

  function animateCounter(counter) {
    const target = Number(counter.getAttribute('data-counter')) || 0;
    const duration = 1100;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value + '+';
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.7 });

  counters.forEach(function (counter) { counterObserver.observe(counter); });

  if (year) year.textContent = new Date().getFullYear();
})();
