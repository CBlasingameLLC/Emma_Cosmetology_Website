export type Service = {
  category: string;
  title: string;
  description: string;
  duration: string;
  price: string;
};

/** Cheapest entry-point service — used for the hero stat. */
export const startingPrice = '$8';

export const services: Service[] = [
  {
    category: 'Cutting',
    title: 'Express haircut',
    description: 'Clippers only — a quick, no-fuss cut with no shampoo or styling.',
    duration: '45–60 min',
    price: '$8',
  },
  {
    category: 'Cutting',
    title: 'Classic haircut',
    description: 'A shampoo plus any haircut — scissor or clipper, your call.',
    duration: '60–90 min',
    price: '$12',
  },
  {
    category: 'Cutting',
    title: 'Designer haircut',
    description: 'A shampoo, any haircut, and a full blow-dry finish.',
    duration: '90 min – 2 hr',
    price: '$15',
  },
  {
    category: 'Styling',
    title: 'Blowout & thermal style',
    description: 'Smooth and shiny or big bouncy curls — the look from my headshot. Great on its own or added onto a cut.',
    duration: '60–90 min',
    price: '$10',
  },
  {
    category: 'Color',
    title: 'Color, gloss & retouch',
    description: 'All-over color, root touch-ups, and shine glosses or toners to cool down brass.',
    duration: '2.5–3.5 hr',
    price: 'From $55',
  },
  {
    category: 'Lightening',
    title: 'Highlights & balayage',
    description: 'Partial or full foils, hand-painted balayage, face-frame money pieces. Plan for a longer visit.',
    duration: '3–4.5 hr',
    price: 'From $65',
  },
  {
    category: 'Treatment',
    title: 'Deep conditioning',
    description: 'Bond-building and moisture treatments with a scalp massage. Great paired with a dusting of the ends.',
    duration: '10–15 min',
    price: '$20',
  },
  {
    category: 'Occasion',
    title: 'Updos & event styling',
    description: "Homecoming, prom, weddings, senior pictures. Bring your inspo photos and we'll plan it together.",
    duration: '90 min – 2 hr',
    price: '$30',
  },
  {
    category: 'Nails',
    title: 'Pedicure',
    description: 'A soak, shaping and polish to freshen up your feet.',
    duration: '60–75 min',
    price: '$16',
  },
];
