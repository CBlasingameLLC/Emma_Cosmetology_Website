// Draggable / keyboard-accessible before-after comparison slider.
export {};

function paint(root: HTMLElement, value: number) {
  root.style.setProperty('--ba', value + '%');
  const handle = root.querySelector<HTMLElement>('[data-ba-handle]');
  if (handle) handle.setAttribute('aria-valuenow', String(Math.round(value)));
}

function init() {
  const roots = document.querySelectorAll<HTMLElement>('[data-ba-root]');
  if (!roots.length) return;

  let dragging: HTMLElement | null = null;
  let ba = 55;

  const setFromClientX = (root: HTMLElement, clientX: number) => {
    const r = root.getBoundingClientRect();
    ba = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    paint(root, ba);
  };

  roots.forEach((root) => paint(root, ba));

  window.addEventListener(
    'pointerdown',
    (e) => {
      const root = (e.target as HTMLElement).closest<HTMLElement>('[data-ba-root]');
      if (!root) return;
      dragging = root;
      setFromClientX(root, e.clientX);
    },
    { passive: true },
  );

  window.addEventListener(
    'pointermove',
    (e) => {
      if (dragging) setFromClientX(dragging, e.clientX);
    },
    { passive: true },
  );

  window.addEventListener('pointerup', () => {
    dragging = null;
  });

  window.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement;
    if (!target?.hasAttribute?.('data-ba-handle')) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    ba = Math.max(0, Math.min(100, ba + (e.key === 'ArrowRight' ? 4 : -4)));
    const root = target.closest<HTMLElement>('[data-ba-root]');
    if (root) paint(root, ba);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
