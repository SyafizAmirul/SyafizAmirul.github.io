/* ========================================================================
   Site behaviour. Four small jobs, no dependencies:
     1. theme toggle (remembers your choice)
     2. mobile menu
     3. fade-in on scroll
     4. highlight the nav link for the section you're looking at
   ======================================================================== */

(() => {
  'use strict';

  const root = document.documentElement;

  /* ---------- 1. Theme ----------------------------------------------- */
  // No stored choice = follow the OS. Clicking stores an explicit one.
  const STORE_KEY = 'theme';

  const stored = (() => {
    try { return localStorage.getItem(STORE_KEY); } catch { return null; }
  })();

  if (stored === 'dark' || stored === 'light') {
    root.dataset.theme = stored;
  }

  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.dataset.theme || (prefersDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    try { localStorage.setItem(STORE_KEY, next); } catch { /* private mode */ }
  });

  /* ---------- 2. Mobile menu ----------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const closeMenu = () => {
    links?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Tapping a link, or pressing Escape, closes it again.
  links?.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- 3. Reveal on scroll ------------------------------------ */
  const revealables = document.querySelectorAll('.reveal');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        // Slight stagger so grouped items don't all pop at once.
        setTimeout(() => entry.target.classList.add('in'), i * 70);
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  /* ---------- 4. Active nav link + header shadow --------------------- */
  const header = document.querySelector('.site-header');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 8);

    // The section whose top has passed just under the sticky header wins.
    const line = window.scrollY + 120;
    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= line) current = s;
    }

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current?.id}`);
    });
  };

  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { onScroll(); queued = false; });
  }, { passive: true });

  onScroll();

  /* ---------- Footer year -------------------------------------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
