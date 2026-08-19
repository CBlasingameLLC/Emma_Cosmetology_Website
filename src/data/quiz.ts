import { flatRate } from './services';

export type QuestionKey = 'goal' | 'history' | 'texture' | 'upkeep' | 'timing';

export type QuizOption = { label: string; sub: string };

export type Question = {
  key: QuestionKey;
  title: string;
  hint: string;
  options: QuizOption[];
};

export const questions: Question[] = [
  {
    key: 'goal',
    title: 'What brings you in?',
    hint: 'Pick whatever is closest.',
    options: [
      { label: 'A cut or reshape', sub: 'Trim, layers, a whole new shape' },
      { label: 'Color', sub: 'All-over, highlights, going lighter or richer' },
      { label: 'Styling for an event', sub: 'Blowout, curls, an updo' },
      { label: 'Repair & treat', sub: 'Dryness, breakage, brassiness' },
      { label: "I'm not sure yet", sub: "Let's talk it through" },
    ],
  },
  {
    key: 'history',
    title: "What's your hair been through?",
    hint: 'Honesty here saves us both time.',
    options: [
      { label: 'Never colored', sub: 'Virgin, natural hair' },
      { label: 'Colored before', sub: 'Salon color at some point' },
      { label: 'Highlighted or lightened', sub: 'Foils, balayage, bleach' },
      { label: 'Box dye', sub: 'Color from a drugstore box' },
    ],
  },
  {
    key: 'texture',
    title: 'How does your hair behave?',
    hint: 'Texture changes how I cut and finish.',
    options: [
      { label: 'Straight', sub: 'Falls flat, holds curl briefly' },
      { label: 'Wavy', sub: 'Bends, frizzes in humidity' },
      { label: 'Curly', sub: 'Defined curls or spirals' },
      { label: 'Coily', sub: 'Tight coils, needs moisture' },
    ],
  },
  {
    key: 'upkeep',
    title: 'How much upkeep do you actually want?',
    hint: 'No judgment — low-maintenance is a real goal.',
    options: [
      { label: 'Low', sub: 'Grow-out friendly, few visits' },
      { label: 'Some', sub: 'Back every couple of months' },
      { label: 'All in', sub: 'I love a regular refresh' },
    ],
  },
  {
    key: 'timing',
    title: 'When are you hoping to come in?',
    hint: "I'll put it in your request.",
    options: [
      { label: 'This week', sub: 'Soon as you have room' },
      { label: 'Next two weeks', sub: 'Some flexibility' },
      { label: "I'm flexible", sub: 'Whatever works for you' },
    ],
  },
];

export type Recommendation = {
  title: string;
  why: string;
  time: string;
  sessions: string;
  upkeep: string;
};

export type QuizResult = {
  recommendation: Recommendation;
  notes: string[];
};

/**
 * Keep these rules exactly — the honesty is the point. Never promise a
 * one-session fix on box dye; never oversell upkeep.
 */
export function recommend(answers: string[]): QuizResult {
  const goal = answers[0] || '';
  const hist = answers[1] || '';
  const tex = answers[2] || '';
  const up = answers[3] || '';
  const lowKeep = up === 'Low';

  let r: Recommendation;
  if (goal === 'A cut or reshape') {
    r = {
      title: 'Haircut & style',
      why: "We'll shape it around how your hair actually falls, then finish it so you can see exactly how to wear it at home.",
      time: '60–75 min',
      sessions: 'One',
      upkeep: lowKeep ? '10–12 weeks' : '6–8 weeks',
    };
  } else if (goal === 'Color') {
    if (hist === 'Box dye') {
      r = {
        title: 'Color consultation first, then correction',
        why: 'Box dye sits differently than salon color, so I want to see your hair in person before we commit. We\'ll plan a safe path to your goal instead of guessing.',
        time: 'Consult 20 min, then 2–3 hr',
        sessions: 'Two or more',
        upkeep: 'Depends on the plan',
      };
    } else if (lowKeep) {
      r = {
        title: 'Balayage or a face-frame',
        why: 'Hand-painted lightening grows out soft, so you get brightness without a hard root line to chase every month.',
        time: '2–3 hr',
        sessions: hist === 'Never colored' ? 'One to start' : 'One or two',
        upkeep: '3–4 months',
      };
    } else if (hist === 'Highlighted or lightened') {
      r = {
        title: 'Partial highlights + toner',
        why: "We'll refresh where you actually see it — around your face and part — then tone so the blonde reads exactly the way you want it.",
        time: '2–2.5 hr',
        sessions: 'One',
        upkeep: '8–10 weeks',
      };
    } else {
      r = {
        title: 'All-over color + gloss',
        why: 'Single-process color for even, rich depth, finished with a gloss so it leaves shiny instead of flat.',
        time: '90 min – 2 hr',
        sessions: 'One',
        upkeep: '6–8 weeks',
      };
    }
  } else if (goal === 'Styling for an event') {
    r = {
      title: 'Blowout or updo',
      why: "Tell me the event and bring photos. We'll pick something that lasts through the whole night, not just the pictures.",
      time: '45–90 min',
      sessions: 'One',
      upkeep: 'Day of the event',
    };
  } else if (goal === 'Repair & treat') {
    r = {
      title: 'Deep conditioning + a dusting',
      why: 'A bond-building treatment plus taking off the ends that are splitting — that combination makes hair feel new without losing length.',
      time: '45–60 min',
      sessions: 'One, then every 4–6 weeks',
      upkeep: '4–6 weeks',
    };
  } else {
    r = {
      title: 'Consultation + blowout',
      why: "Come in, let's talk through what you like and don't like, and you leave with a fresh style either way. No commitment needed.",
      time: '60 min',
      sessions: 'One',
      upkeep: 'Up to you',
    };
  }

  const notes: string[] = [];
  if (tex) notes.push(`${tex} hair — I'll cut and finish for that texture, not against it.`);
  if (hist && goal === 'Color') notes.push(`Hair history: ${hist.toLowerCase()}. Bring anything you know about past color.`);
  notes.push('Bring 2–3 inspiration photos — even ones you dislike help me understand your taste.');
  notes.push(`Every service is ${flatRate} flat at the academy, no matter how long it takes.`);

  return { recommendation: r, notes };
}
