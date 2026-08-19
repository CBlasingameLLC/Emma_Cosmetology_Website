// Site-wide chrome: theme toggle, scroll progress, active nav link, pointer spotlight/tilt.
// Mirrors the design prototype's global pointer controller.
export {};

function applyTheme(dark: boolean) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#1a1113' : '#fdf7f9');
  const knob = document.getElementById('theme-knob');
  if (knob) knob.style.setProperty('--knob', dark ? '24px' : '0px');
}

function initTheme() {
  let dark = false;
  try {
    dark = localStorage.getItem('bb-theme') === 'dark';
  } catch {
    // localStorage unavailable; default to light
  }
  applyTheme(dark);

  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const nowDark = document.documentElement.getAttribute('data-theme') !== 'dark';
    applyTheme(nowDark);
    try {
      localStorage.setItem('bb-theme', nowDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  });
}

function initScrollProgress() {
  const el = document.getElementById('scroll-progress');
  if (!el) return;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    el.style.width = pct.toFixed(2) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initNavObserver() {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-navlink]');
  const sections = document.querySelectorAll<HTMLElement>('[data-nav]');
  if (!links.length || !sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('data-nav');
        links.forEach((a) => {
          a.style.color = a.getAttribute('data-navlink') === id ? 'var(--pink)' : 'var(--ink-2)';
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
}

function initPointerEffects() {
  const hoverCapable = window.matchMedia('(hover: hover)').matches;
  let lastTilt: HTMLElement | null = null;

  window.addEventListener(
    'pointermove',
    (e) => {
      const target = e.target as HTMLElement | null;
      const spot = target?.closest<HTMLElement>('[data-spot]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(2) + '%');
        spot.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(2) + '%');
      }

      const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (lastTilt && lastTilt !== tilt) {
        lastTilt.style.transform = '';
        lastTilt = null;
      }
      if (tilt && hoverCapable) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(1100px) rotateY(${(px * 9).toFixed(2)}deg) rotateX(${(-py * 9).toFixed(2)}deg) translateZ(0)`;
        lastTilt = tilt;
      }
    },
    { passive: true },
  );
}

function init() {
  initTheme();
  initScrollProgress();
  initNavObserver();
  initPointerEffects();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
