import { contact } from '../data/contact';
import { track } from './analytics';

function bookingBody(): string {
  const name = (document.getElementById('f-name') as HTMLInputElement)?.value.trim();
  const service = (document.getElementById('f-service') as HTMLInputElement)?.value.trim();
  const when = (document.getElementById('f-when') as HTMLInputElement)?.value.trim();
  const notes = (document.getElementById('f-notes') as HTMLTextAreaElement)?.value.trim();

  const lines = ["Hi Emma! I'd like to book an appointment."];
  if (name) lines.push('Name: ' + name);
  if (service) lines.push('Service: ' + service);
  if (when) lines.push('When: ' + when);
  if (notes) lines.push('Notes: ' + notes);
  return lines.join('\n');
}

function refreshLinks() {
  const smsLink = document.getElementById('sms-link') as HTMLAnchorElement | null;
  const mailLink = document.getElementById('mail-link') as HTMLAnchorElement | null;
  const body = bookingBody();
  if (smsLink) smsLink.href = `sms:${contact.phoneDirectRaw}?&body=${encodeURIComponent(body)}`;
  if (mailLink) {
    mailLink.href = `mailto:?subject=${encodeURIComponent('Appointment request for Emma')}&body=${encodeURIComponent(body)}`;
  }
}

function init() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  refreshLinks();
  form.addEventListener('input', refreshLinks);
  document.addEventListener('bb-booking-updated', refreshLinks);

  document.getElementById('sms-link')?.addEventListener('click', () => track('booking_sms_click'));
  document.getElementById('mail-link')?.addEventListener('click', () => track('booking_email_click'));
  document.getElementById('call-direct')?.addEventListener('click', () => track('call_direct'));
  document.getElementById('call-academy')?.addEventListener('click', () => track('call_academy'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
