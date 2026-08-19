export type BeforeAfter = {
  before: string;
  after: string;
  alt: string;
  service: string;
};

/**
 * Empty until Emma has real before/after shots — the slider renders
 * placeholder panels until this has at least one pair.
 */
export const beforeAfterPairs: BeforeAfter[] = [];
