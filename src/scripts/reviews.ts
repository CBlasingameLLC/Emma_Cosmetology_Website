// Review list + submit form. Stores submissions in localStorage for now —
// this device only. Production TODO (see design/README.md §Reviews):
// POST to /api/reviews (Supabase, status:'pending'), notify Emma, and only
// render status:'approved' rows publicly.

import type { Review } from '../data/reviews';
import { reviews as approvedReviews } from '../data/reviews';

const STORAGE_KEY = 'bb-reviews';

function loadLocalReviews(): Review[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(raw)) return raw;
  } catch {
    // ignore
  }
  return [];
}

function saveLocalReviews(reviews: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string));
}

function starString(n: number): string {
  return '★★★★★'.slice(0, Math.max(0, Math.min(5, n)));
}

function renderList(reviews: Review[]) {
  const listEl = document.getElementById('reviews-list');
  const emptyEl = document.getElementById('reviews-empty');
  if (!listEl || !emptyEl) return;

  if (reviews.length === 0) {
    listEl.hidden = true;
    emptyEl.hidden = false;
    return;
  }

  emptyEl.hidden = true;
  listEl.hidden = false;
  listEl.innerHTML = reviews
    .map(
      (rv) => `
      <figure data-spot class="review-card">
        <div class="review-stars">${escapeHtml(starString(rv.stars))}</div>
        <blockquote class="review-quote">${escapeHtml(rv.text)}</blockquote>
        <figcaption class="review-name">${escapeHtml(rv.name)}</figcaption>
      </figure>`,
    )
    .join('');
}

function init() {
  const form = document.getElementById('review-form') as HTMLFormElement | null;
  if (!form) return;

  let reviews = approvedReviews.concat(loadLocalReviews());
  renderList(reviews);

  const nameInput = document.getElementById('rv-name') as HTMLInputElement;
  const textInput = document.getElementById('rv-text') as HTMLTextAreaElement;
  const starButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-star]'));
  const submitBtn = document.getElementById('rv-submit') as HTMLButtonElement;

  let stars = 5;

  function paintStars() {
    starButtons.forEach((btn) => {
      const n = Number(btn.dataset.star);
      btn.style.setProperty('--st-op', n <= stars ? '1' : '.32');
    });
  }
  paintStars();

  starButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      stars = Number(btn.dataset.star);
      paintStars();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!name || !text) return;

    const local = loadLocalReviews();
    local.unshift({ name, text, stars });
    saveLocalReviews(local);
    reviews = approvedReviews.concat(local);
    renderList(reviews);

    nameInput.value = '';
    textInput.value = '';
    stars = 5;
    paintStars();

    submitBtn.textContent = 'Thank you ♡';
    setTimeout(() => {
      submitBtn.textContent = 'Post my review';
    }, 2600);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
