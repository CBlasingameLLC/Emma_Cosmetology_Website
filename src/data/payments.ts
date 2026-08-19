export type PaymentMethod = {
  method: 'Venmo' | 'Cash App' | 'Zelle';
  value: string;
  href?: string;
};

/**
 * Venmo and Cash App handles are placeholders from the design handoff —
 * confirm both with Emma before launch.
 */
export const payments: PaymentMethod[] = [
  { method: 'Venmo', value: '@Emma-Blasingame', href: 'https://venmo.com/u/Emma-Blasingame' },
  { method: 'Cash App', value: '$emmablasingame', href: 'https://cash.app/$emmablasingame' },
  { method: 'Zelle', value: '903-730-1234' },
];
