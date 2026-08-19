// Privacy-friendly analytics sink (Plausible/Umami-shaped). Swap the no-op
// branch for a real `<script defer data-domain=... src=".../script.js">`
// once Emma picks a domain and a provider.

type AnalyticsEvent =
  | 'quiz_start'
  | 'quiz_complete'
  | 'booking_sms_click'
  | 'booking_email_click'
  | 'call_direct'
  | 'call_academy'
  | 'model_cta_click'
  | 'tip_click'
  | 'vcard_download'
  | 'pwa_install'
  | 'theme_toggle';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  if (window.plausible) {
    window.plausible(event, props ? { props } : undefined);
    return;
  }
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, props ?? {});
  }
}
