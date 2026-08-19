export type Service = {
  category: string;
  title: string;
  description: string;
  duration: string;
};

export const flatRate = '$15';

export const services: Service[] = [
  {
    category: 'Cutting',
    title: 'Haircut & style',
    description: 'Consultation, shampoo, cut and a finished style. Trims, face-framing, long layers, blunt bobs.',
    duration: '60–75 min',
  },
  {
    category: 'Styling',
    title: 'Blowout & thermal style',
    description: 'Smooth and shiny or big bouncy curls — the look from my headshot. Perfect before an event.',
    duration: '45–60 min',
  },
  {
    category: 'Color',
    title: 'Color, gloss & toner',
    description: 'All-over color, root touch-ups, shine glosses and toners to cool down brass.',
    duration: '90 min – 2 hr',
  },
  {
    category: 'Lightening',
    title: 'Highlights & balayage',
    description: 'Partial or full foils, hand-painted balayage, face-frame money pieces. Plan for a longer visit.',
    duration: '2–3 hr',
  },
  {
    category: 'Treatment',
    title: 'Deep conditioning',
    description: 'Bond-building and moisture treatments with a scalp massage. Great paired with a dusting of the ends.',
    duration: '30–45 min',
  },
  {
    category: 'Occasion',
    title: 'Updos & event styling',
    description: "Homecoming, prom, weddings, senior pictures. Bring your inspo photos and we'll plan it together.",
    duration: '60–90 min',
  },
];
