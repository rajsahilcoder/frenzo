import { PRICING_RATES } from '../constants';

/**
 * Calculates the original price before discount and formats it with commas
 * @param {number} price - The current discounted price
 * @returns {string} The original price formatted with commas (e.g., "5,000")
 */
export const calculateDiscountedPrice = (price) => {
  if (!price) return "0";
  return Math.round(price * PRICING_RATES.DISCOUNT_MULTIPLIER).toLocaleString();
};
