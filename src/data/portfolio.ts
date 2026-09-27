import type { ImageMetadata } from 'astro';
import colorBefore from '../assets/color-before.jpg';
import colorAfter from '../assets/color-after.jpg';

export type BeforeAfter = {
  before: ImageMetadata;
  after: ImageMetadata;
  alt: string;
  service: string;
};

/**
 * Empty renders placeholder panels in the slider — add pairs here as real
 * before/after shots come in.
 */
export const beforeAfterPairs: BeforeAfter[] = [
  {
    before: colorBefore,
    after: colorAfter,
    alt: 'Hair color transformation',
    service: 'Color',
  },
];
