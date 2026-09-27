export type PaymentMethod = {
  method: 'Venmo' | 'Cash App';
  value: string;
  href: string;
};

export const payments: PaymentMethod[] = [
  { method: 'Venmo', value: '@Emma-Blasingame-2', href: 'https://venmo.com/u/Emma-Blasingame-2' },
  { method: 'Cash App', value: '$EmmaBlasingame0', href: 'https://cash.app/$EmmaBlasingame0' },
];
