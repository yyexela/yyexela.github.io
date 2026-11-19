(() => {
  'use strict';

  const nav = document.querySelector('#primary-nav');
  const menu = document.querySelector('.menu-toggle');
  const navLinks = Array.from(nav.querySelectorAll('a'));
  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
  }
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu(); menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-nav')) closeMenu();
  });
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  const scrollCue = document.querySelector('.scroll-cue');
  let scrollPending = false;
  function markSection() {
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) active = section; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1];
    navLinks.forEach(link => {
      if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const progress = Math.min(Math.max(scrollY / 160, 0), 1);
    scrollCue.style.opacity = String(1 - progress);
    scrollCue.style.visibility = progress === 1 ? 'hidden' : 'visible';
    scrollPending = false;
  }
  addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(markSection); }
  }, { passive: true });
  markSection();

  const themeToggle = document.querySelector('#theme-toggle');
  function setTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = dark ? '#0b0e12' : '#ffffff';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
    themeToggle.querySelector('svg').innerHTML = dark
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>'
      : '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"/>';
    dispatchEvent(new Event('field-theme-change'));
  }
  themeToggle.hidden = false;
  setTheme(document.documentElement.dataset.theme || 'dark');
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('field-theory-theme', theme); } catch (_) {}
    setTheme(theme);
  });

  // A projected wave surface made of particles. This is a generative illustration,
  // not a visualization of research data. Each point follows the same smooth field.
  const canvas = document.querySelector('#particle-field');
  const context = canvas.getContext('2d');
  if (!context) return;
  const hero = canvas.closest('.hero');
  const motion = document.querySelector('#motion-toggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  let visible = true;
  let width = 1, height = 1;
  let time = 1.7, previous = 0, frame = null;

  function paint() {
    context.clearRect(0, 0, width, height);
    const columns = width < 700 ? 105 : 180;
    const rows = width < 700 ? 48 : 72;
    const amplitude = width < 700 ? 58 : 100;
    const depthRange = width < 700 ? 220 : 285;
    const base = height - (width < 700 ? 245 : 310);
    const dark = document.documentElement.dataset.theme === 'dark';
    for (let row = 0; row < rows; row++) {
      const depth = row / (rows - 1);
      const perspective = .62 + depth * .58;
      const opacity = dark ? .3 + depth * .5 : .1 + depth * .4;
      context.fillStyle = dark
        ? `rgba(105,${Math.round(177 + depth * 30)},250,${opacity})`
        : `rgba(45,${Math.round(127 + depth * 32)},214,${opacity})`;
      context.beginPath();
      for (let col = 0; col < columns; col++) {
        const u = (col / (columns - 1) - .5) * 2.7;
        const wave = Math.sin(u * 3.5 + depth * 3.2 - time * .38)
          + .35 * Math.sin(u * 6 - depth * 4 + time * .24);
        const px = width * .5 + u * width * .5 * perspective;
        const py = base + depth * depthRange + wave * amplitude * (.6 + depth * .6);
        const radius = .65 + depth * .65;
        context.moveTo(px + radius, py);
        context.arc(px, py, radius, 0, Math.PI * 2);
      }
      context.fill();
    }
    // Transparent fade works on both themes, including when motion is paused.
    const fade = context.createLinearGradient(0, height - 65, 0, height);
    fade.addColorStop(0, 'rgba(0,0,0,0)'); fade.addColorStop(1, 'rgba(0,0,0,1)');
    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = fade; context.fillRect(0, height - 65, width, 65);
    context.globalCompositeOperation = 'source-over';
  }
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    paint();
  }
  function animate(now) {
    frame = null;
    if (paused || !visible || document.hidden) return;
    if (now - previous >= 1000 / 30) {
      time += Math.min((now - previous) / 1000, .06);
      previous = now;
      paint();
    }
    frame = requestAnimationFrame(animate);
  }
  function schedule() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; previous = performance.now();
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(animate);
  }
  function updateButton() {
    motion.setAttribute('aria-pressed', String(paused));
    motion.querySelector('span').textContent = paused ? 'Play motion' : 'Pause motion';
    motion.querySelector('svg').innerHTML = paused
      ? '<path d="m8 5 11 7-11 7Z"/>' : '<path d="M8 5v14 M16 5v14"/>';
  }
  motion.hidden = false;
  motion.addEventListener('click', () => { paused = !paused; updateButton(); schedule(); });
  preference.addEventListener('change', event => { paused = event.matches; updateButton(); schedule(); });
  addEventListener('field-theme-change', paint);
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(hero);
  document.addEventListener('visibilitychange', schedule);
  updateButton(); resize(); schedule();
})();
