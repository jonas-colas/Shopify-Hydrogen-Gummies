type MetafieldValue = {value: string} | null | undefined;
type Price = {amount: string} | null | undefined;

/**
 * Shopify's standard review metafields, filled by review apps:
 * reviews.rating = {"value": "4.9", ...}, reviews.rating_count = "13035"
 */
export function parseRating(rating: MetafieldValue, count: MetafieldValue) {
  if (!rating?.value) return null;
  try {
    const {value} = JSON.parse(rating.value) as {value: string};
    return {
      value: Number(value),
      count: Number(count?.value ?? 0),
    };
  } catch {
    return null;
  }
}

/** "Save 20%" from a price and a higher compare-at price; 0 if no discount */
export function savePercent(price: Price, compareAt: Price) {
  const amount = Number(price?.amount);
  const compareAmount = Number(compareAt?.amount);
  if (!amount || !compareAmount || compareAmount <= amount) return 0;
  return Math.round((1 - amount / compareAmount) * 100);
}


/**
 * Pieces in a pack, from the custom.pack_size metafield:
 * "60 Gummies / Bottle" → {count: 60, unit: 'gummy'}
 */
export function parsePackSize(packSize: MetafieldValue) {
  const match = packSize?.value.match(/(\d+)\s*([a-z]+)?/i);
  if (!match) return null;
  const count = Number(match[1]);
  if (!count) return null;
  const word = (match[2] ?? 'piece').toLowerCase();
  // Gummies → gummy, Capsules → capsule
  const unit = word.endsWith('ies')
    ? `${word.slice(0, -3)}y`
    : word.replace(/s$/, '');
  return {count, unit};
}
