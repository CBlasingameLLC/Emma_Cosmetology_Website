// Ticks the graduation countdown every second. Drives both the hero "days to
// graduation" stat and the dedicated countdown section from one shared timer,
// matching the design prototype's single `now` tick.
import { contact } from '../data/contact';

const TARGET = Date.parse(contact.gradTarget);

function pad(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

function set(key: string, value: string) {
  document.querySelectorAll<HTMLElement>(`[data-countdown="${key}"]`).forEach((el) => {
    el.textContent = value;
  });
}

function tick() {
  const left = Math.max(0, TARGET - Date.now());
  set('days', String(Math.floor(left / 86400000)));
  set('hours', pad(Math.floor(left / 3600000) % 24));
  set('mins', pad(Math.floor(left / 60000) % 60));
  set('secs', pad(Math.floor(left / 1000) % 60));
  set('totalHours', Math.floor(left / 3600000).toLocaleString('en-US'));
  set('totalMinutes', Math.floor(left / 60000).toLocaleString('en-US'));
}

tick();
setInterval(tick, 1000);
