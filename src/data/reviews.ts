export type Review = {
  name: string;
  text: string;
  stars: number;
};

/**
 * Empty until at least two reviews are approved — an honest empty state
 * beats invented testimonials. In production, fetch approved reviews from
 * the /api/reviews backend (Supabase) instead of hardcoding this list.
 */
export const reviews: Review[] = [];
