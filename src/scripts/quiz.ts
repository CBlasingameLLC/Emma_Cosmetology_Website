import { questions, recommend } from '../data/quiz';
import { track } from './analytics';

type Stage = 'intro' | 'q' | 'result';
type State = { stage: Stage; step: number; answers: string[] };

const STORAGE_KEY = 'bb-quiz';

function loadState(): State {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as State;
      if (parsed && typeof parsed.step === 'number' && Array.isArray(parsed.answers)) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { stage: 'intro', step: 0, answers: [] };
}

function saveState(state: State) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string));
}

function progress(state: State): number {
  if (state.stage === 'intro') return 0;
  if (state.stage === 'result') return 100;
  return Math.round((state.step / questions.length) * 100);
}

function renderIntro(): string {
  return `
    <div class="quiz-intro">
      <div class="quiz-medallion"><span>?</span></div>
      <h3 class="quiz-intro-title">Let's figure out what your hair actually needs.</h3>
      <p class="quiz-intro-body">No pressure and no wrong answers — this is just the conversation we'd have at the mirror, a little early.</p>
      <button type="button" class="btn-primary" data-action="start">Start the quiz</button>
    </div>
  `;
}

function renderQuestion(state: State): string {
  const q = questions[state.step];
  const options = q.options
    .map(
      (opt) => `
      <button type="button" class="quiz-option" data-action="pick" data-value="${escapeHtml(opt.label)}">
        <span class="opt-label">${escapeHtml(opt.label)}</span>
        <span class="opt-sub">${escapeHtml(opt.sub)}</span>
      </button>`,
    )
    .join('');
  return `
    <div class="quiz-question">
      <div class="quiz-q-head">
        <span class="quiz-q-count">Question ${state.step + 1} of ${questions.length}</span>
        <button type="button" class="quiz-back" data-action="back">← Back</button>
      </div>
      <h3 class="quiz-q-title">${escapeHtml(q.title)}</h3>
      <p class="quiz-q-hint">${escapeHtml(q.hint)}</p>
      <div class="quiz-options">${options}</div>
    </div>
  `;
}

function renderResult(state: State): string {
  const { recommendation: r, notes } = recommend(state.answers);
  const notesHtml = notes
    .map((n) => `<div class="quiz-note"><span class="note-dot">✦</span><span>${escapeHtml(n)}</span></div>`)
    .join('');
  return `
    <div class="quiz-result">
      <div class="eyebrow">Emma suggests</div>
      <h3 class="quiz-result-title">${escapeHtml(r.title)}</h3>
      <p class="quiz-result-why">${escapeHtml(r.why)}</p>
      <div class="quiz-stats">
        <div class="quiz-stat"><div class="stat-k">Time in chair</div><div class="stat-v">${escapeHtml(r.time)}</div></div>
        <div class="quiz-stat"><div class="stat-k">Visits</div><div class="stat-v">${escapeHtml(r.sessions)}</div></div>
        <div class="quiz-stat"><div class="stat-k">Upkeep</div><div class="stat-v">${escapeHtml(r.upkeep)}</div></div>
      </div>
      <div class="quiz-notes-panel">
        <div class="notes-label">Notes for your consultation</div>
        <div class="notes-list">${notesHtml}</div>
      </div>
      <div class="quiz-actions">
        <button type="button" class="btn-primary" data-action="use-result">Fill out my booking request →</button>
        <button type="button" class="btn-ghost-outline" data-action="restart">Start over</button>
      </div>
    </div>
  `;
}

function render(state: State) {
  const stageEl = document.getElementById('quiz-stage');
  const progressEl = document.getElementById('quiz-progress');
  if (!stageEl || !progressEl) return;

  let html = '';
  if (state.stage === 'intro') html = renderIntro();
  else if (state.stage === 'q') html = renderQuestion(state);
  else html = renderResult(state);

  stageEl.innerHTML = html;
  stageEl.classList.remove('pop');
  // Force reflow so the animation re-triggers on every stage change.
  void stageEl.offsetWidth;
  stageEl.classList.add('pop');

  progressEl.style.width = progress(state) + '%';
}

function useResult(state: State) {
  const { recommendation: r, notes } = recommend(state.answers);
  const notesText = notes.join(' ');
  const timing = state.answers[4] || '';

  const serviceInput = document.getElementById('f-service') as HTMLInputElement | null;
  const whenInput = document.getElementById('f-when') as HTMLInputElement | null;
  const notesInput = document.getElementById('f-notes') as HTMLTextAreaElement | null;
  if (serviceInput) serviceInput.value = r.title;
  if (whenInput) whenInput.value = timing;
  if (notesInput) notesInput.value = notesText;
  document.dispatchEvent(new CustomEvent('bb-booking-updated'));

  track('quiz_complete', { service: r.title });

  const target = document.getElementById('book');
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function init() {
  const shell = document.getElementById('quiz-shell');
  if (!shell) return;

  let state = loadState();
  render(state);

  shell.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const actionEl = target.closest<HTMLElement>('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    if (action === 'start') {
      state = { stage: 'q', step: 0, answers: [] };
      track('quiz_start');
    } else if (action === 'back') {
      state = state.step === 0 ? { ...state, stage: 'intro' } : { ...state, step: state.step - 1, stage: 'q' };
    } else if (action === 'pick') {
      const value = actionEl.dataset.value || '';
      const answers = state.answers.slice(0, state.step).concat([value]);
      const done = state.step + 1 >= questions.length;
      state = { stage: done ? 'result' : 'q', step: done ? state.step : state.step + 1, answers };
    } else if (action === 'use-result') {
      useResult(state);
      return;
    } else if (action === 'restart') {
      state = { stage: 'intro', step: 0, answers: [] };
    } else {
      return;
    }

    saveState(state);
    render(state);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
