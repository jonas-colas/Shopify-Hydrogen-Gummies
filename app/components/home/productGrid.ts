import type {HomeGridProductFragment} from 'storefrontapi.generated';

/**
 * Filter tabs. A product belongs to a mood when it has that tag in Shopify
 * (Products → product → Tags). Tabs without any tagged product are hidden.
 */
export const MOODS = [
  {tag: 'energy', label: 'Energy', mobileLabel: 'Energy & Focus'},
  {tag: 'chill', label: 'Chill', mobileLabel: 'Balanced Chill'},
  {tag: 'rest', label: 'Rest', mobileLabel: 'Restful Sleep'},
] as const;

export type MoodTag = (typeof MOODS)[number]['tag'];

/** The 4 card colour themes from the design */
export const CARD_THEMES = [
  {
    accent: 'bg-secondary-container',
    badge: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    mobileBadge: 'bg-secondary-container text-on-secondary',
    mobileLabel: 'text-secondary',
  },
  {
    accent: 'bg-gradient-to-r from-secondary-container to-tertiary-container',
    badge: 'bg-secondary-container text-on-primary font-bold',
    mobileBadge: 'bg-on-tertiary-container text-on-tertiary',
    mobileLabel: 'text-on-tertiary-container',
  },
  {
    accent: 'bg-primary',
    badge: 'bg-primary-fixed text-on-primary-fixed',
    mobileBadge: 'bg-primary text-on-primary',
    mobileLabel: 'text-primary-container',
  },
  {
    accent: 'bg-tertiary-container',
    badge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold',
    mobileBadge: 'bg-inverse-surface text-inverse-on-surface',
    mobileLabel: 'text-on-primary-fixed-variant',
  },
];

export type GridProduct = HomeGridProductFragment & {
  mood?: (typeof MOODS)[number];
  theme: (typeof CARD_THEMES)[number];
};

/**
 * Adds each product's mood (from its tags) and colour theme.
 * Tagged products use their mood's colour; untagged ones cycle through
 * the themes by position, so the grid always looks like the design.
 */
export function toGridProducts(
  products: HomeGridProductFragment[],
): GridProduct[] {
  return products.map((product, index) => {
    const tags = product.tags.map((tag) => tag.toLowerCase());
    const moodIndex = MOODS.findIndex((mood) => tags.includes(mood.tag));
    const mood = moodIndex >= 0 ? MOODS[moodIndex] : undefined;

    return {
      ...product,
      mood,
      theme:
        CARD_THEMES[moodIndex >= 0 ? moodIndex : index % CARD_THEMES.length],
    };
  });
}

/** Only the moods that at least one product has */
export function availableMoods(products: GridProduct[]) {
  return MOODS.filter((mood) =>
    products.some((product) => product.mood?.tag === mood.tag),
  );
}
