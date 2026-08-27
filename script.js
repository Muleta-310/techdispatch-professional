/* ================================================================
   Tech Dispatch – script.js
   Professional IT Services | Anchorage, Alaska
   ================================================================ */

'use strict';

/* ---------------------------------------------------------------
   Helpers
--------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------------------------------------------------------------
   Smooth scrolling for all internal anchor links
--------------------------------------------------------------- */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---------------------------------------------------------------
   Mobile hamburger menu
--------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = $('#navToggle');
  const menu   = $('#navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  // Close when a nav link is clicked
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.nav__link')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* ---------------------------------------------------------------
   Scroll-based header background change
--------------------------------------------------------------- */
function initScrollHeader() {
  const header = $('#header');
  if (!header) return;

  const THRESHOLD = 60;
  const update = () => header.classList.toggle('scrolled', window.scrollY > THRESHOLD);

  window.addEventListener('scroll', update, { passive: true });
  update(); // run on load
}

/* ---------------------------------------------------------------
   Active nav link highlighting based on scroll position
--------------------------------------------------------------- */
function initActiveNav() {
  const sections = $$('main [id]');
  const links    = $$('.nav__link');
  if (!sections.length || !links.length) return;

  const setActive = () => {
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) current = sec.id;
    });

    links.forEach((link) => {
      const href = link.getAttribute('href').slice(1);
      const isCurrent = href === current;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ---------------------------------------------------------------
   Intersection Observer – scroll-reveal animations
--------------------------------------------------------------- */
function initScrollAnimations() {
  const animatables = $$('[class*="animate-fade"]');
  if (!animatables.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatables.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   Animated counter for stats
--------------------------------------------------------------- */
function initCounters() {
  const counters = $$('[data-target]');
  if (!counters.length) return;

  const DURATION = 1600; // ms

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const start  = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / DURATION, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------
   Back-to-top button
--------------------------------------------------------------- */
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------------
   Set current year in footer
--------------------------------------------------------------- */
function initFooterYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------
   Contact form validation & submission
--------------------------------------------------------------- */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const FIELDS = {
    firstName: { required: true,  label: 'First name' },
    lastName:  { required: true,  label: 'Last name'  },
    email:     { required: true,  label: 'Email address', isEmail: true },
    phone:     { required: false, label: 'Phone', isPhone: true },
    service:   { required: true,  label: 'Service'    },
    message:   { required: true,  label: 'Message', minLength: 10 },
  };

  /* Validation helpers */
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isValidPhone = (v) => !v || /^[\d\s\-+().]{7,20}$/.test(v.trim());

  function validateField(name, value) {
    const cfg = FIELDS[name];
    if (!cfg) return null;

    if (cfg.required && !value.trim()) return `${cfg.label} is required.`;
    if (value && cfg.isEmail && !isValidEmail(value)) return 'Please enter a valid email address.';
    if (value && cfg.isPhone && !isValidPhone(value)) return 'Please enter a valid phone number.';
    if (value && cfg.minLength && value.trim().length < cfg.minLength)
      return `${cfg.label} must be at least ${cfg.minLength} characters.`;
    return null;
  }

  function showFieldError(input, message) {
    const group = input.closest('.form-group');
    const errorEl = group && group.querySelector('.form-error');
    input.classList.toggle('invalid', !!message);
    input.classList.toggle('valid',   !message && !!input.value);
    if (errorEl) errorEl.textContent = message || '';
  }

  /* Validate on blur */
  form.addEventListener('focusout', (e) => {
    const input = e.target;
    if (!FIELDS[input.name]) return;
    const error = validateField(input.name, input.value);
    showFieldError(input, error);
  });

  /* Validate on input to clear errors quickly */
  form.addEventListener('input', (e) => {
    const input = e.target;
    if (!FIELDS[input.name] || !input.classList.contains('invalid')) return;
    const error = validateField(input.name, input.value);
    showFieldError(input, error);
  });

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let hasError = false;

    Object.keys(FIELDS).forEach((name) => {
      const input = form.elements[name];
      if (!input) return;
      const error = validateField(name, input.value);
      showFieldError(input, error);
      if (error) hasError = true;
    });

    if (hasError) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Simulate async submission */
    const btn = form.querySelector('[type="submit"]');
    btn.classList.add('loading');
    btn.disabled = true;

    try {
      await new Promise((res) => setTimeout(res, 1200)); // simulated network delay
      form.reset();
      Object.keys(FIELDS).forEach((name) => {
        const input = form.elements[name];
        if (input) { input.classList.remove('valid', 'invalid'); }
      });
      const success = $('#formSuccess');
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { success.hidden = true; }, 8000);
      }
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
}

/* ---------------------------------------------------------------
   Boot
--------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMobileMenu();
  initScrollHeader();
  initActiveNav();
  initScrollAnimations();
  initCounters();
  initBackToTop();
  initFooterYear();
  initContactForm();
});
