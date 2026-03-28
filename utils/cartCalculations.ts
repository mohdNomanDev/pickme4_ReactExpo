export const calculateCartTotals = (cart) => {
  let subtotal = 0;

  // 🧮 calculate subtotal
  cart.forEach((restaurant) => {
    restaurant.items.forEach((item) => {
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
