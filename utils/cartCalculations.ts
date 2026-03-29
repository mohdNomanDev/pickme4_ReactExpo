export const calculateCartTotals = (cart: any[]) => {
  let subtotal = 0;

  // 🧮 calculate subtotal
  cart.forEach((restaurant: any) => {
    restaurant.items.forEach((item: any) => {
      subtotal += item.price * item.quantity;
    });
  });

  // 🚚 delivery (simple logic for now)
  const deliveryFee = subtotal > 100 ? 0 : 10;

  // 🧾 VAT 15%
  const vat = subtotal * 0.15;

  // 💰 total
  const total = subtotal + vat + deliveryFee;

  return {
    subtotal,
    deliveryFee,
    vat,
    total,
  };
};
