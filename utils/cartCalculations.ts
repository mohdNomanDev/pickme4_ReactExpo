export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  vat: number;
  total: number;
}

/**
 * Optimized Cart Calculation
 * Memoization should be handled at the selector level in Redux.
 */
export const calculateCartTotals = (
  cart: any[], 
  config = { taxRate: 0.15, freeDeliveryThreshold: 100, defaultDeliveryFee: 10 }
): CartTotals => {
  let subtotal = 0;

  // Single pass calculation
  for (const restaurant of cart) {
    for (const item of restaurant.items) {
      subtotal += (item.price || 0) * (item.quantity || 0);
    }
  }

  const deliveryFee = subtotal === 0 ? 0 : (subtotal > config.freeDeliveryThreshold ? 0 : config.defaultDeliveryFee);
  const vat = subtotal * config.taxRate;
  const total = subtotal + vat + deliveryFee;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    deliveryFee: Number(deliveryFee.toFixed(2)),
    vat: Number(vat.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};
