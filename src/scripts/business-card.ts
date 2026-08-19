import { track } from './analytics';

function vCard(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Blasingame;Emma;;;',
    'FN:Emma Blasingame',
    'ORG:Blasingame Beauty',
    'TITLE:Cosmetology Student',
    'TEL;TYPE=CELL:+19037301234',
    'TEL;TYPE=WORK:+19038717575',
    'ADR;TYPE=WORK:;;The Salon Professional Academy;Whitehouse;TX;;USA',
    'URL:https://www.instagram.com/blasingame_beauty',
    'NOTE:Hair by Emma - book by call or text.',
    'END:VCARD',
  ].join('\r\n');
}

function saveContact() {
  const url = URL.createObjectURL(new Blob([vCard()], { type: 'text/vcard' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emma-blasingame.vcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  track('vcard_download');
}

async function shareCard(labelEl: HTMLElement) {
  const url = window.location.href;
  const data = {
    title: 'Hair by Emma Blasingame',
    text: 'Book with Emma — cosmetology student in Whitehouse, TX.',
    url,
  };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch {
      // user cancelled; no feedback needed
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // clipboard unavailable; still show feedback
  }
  const original = labelEl.textContent;
  labelEl.textContent = 'Link copied ♡';
  setTimeout(() => {
    labelEl.textContent = original;
  }, 2200);
}

function initInstall() {
  const installBtn = document.getElementById('install-app-btn');
  if (!installBtn) return;

  const show = () => {
    installBtn.hidden = false;
  };
  if ((window as any).__bbInstall) show();
  window.addEventListener('bb-installable', show);

  installBtn.addEventListener('click', async () => {
    const prompt = (window as any).__bbInstall;
    if (!prompt) return;
    prompt.prompt();
    try {
      await prompt.userChoice;
      track('pwa_install');
    } catch {
      // dismissed
    }
    (window as any).__bbInstall = null;
    installBtn.hidden = true;
  });
}

function init() {
  document.getElementById('save-contact-btn')?.addEventListener('click', saveContact);
  const shareBtn = document.getElementById('share-card-btn');
  const shareLabel = document.getElementById('share-card-label');
  if (shareBtn && shareLabel) {
    shareBtn.addEventListener('click', () => shareCard(shareLabel));
  }
  initInstall();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
