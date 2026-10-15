function addToCart(cart, product, qty) {
  if (!qty && qty <= 0) {
    throw new RangeError("Количество должно быть целым положительным числом");
  }
  const cartProduct = cart?.find((p) => p.id === product.id);

  if (cartProduct) {
    if (cartProduct.quantity + qty > cartProduct.stock) {
      throw new RangeError("Не достаточное количество товара на складе");
    }
    cartProduct.quantity += qty;
  } else {
    if (qty > product.stock) {
      throw new RangeError("Не достаточное количество товара на складе");
    }
    cart.push({ ...product, quantity: qty });
  }
  return cart;
}
function changeQuantity(cart, id, qty) {
  if (!qty && qty <= 0) {
    throw new RangeError("Количество должно быть целым положительным числом");
  }
  const product = cart?.find((item) => item.id === id);
  if (product && qty > product.stock) {
    throw new RangeError("Не достаточное количество товара на складе");
  }

  product ? (product.quantity = qty) : null;
  return cart;
}
function removeFromCart(cart, id) {
  const productPosition = cart?.findIndex((p) => p.id === id);
  if (productPosition < 0) {
    return cart;
  }
  cart.splice(productPosition, 1);
  return cart;
}
function calculateCartSubtotal(cart) {
  return cart.reduce((acc, p) => acc + p.quantity * p.price, 0);
}
function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  const applyPromo = promo === "SAVE10" && subtotal >= 20000;
  const discount = applyPromo ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal + delivery - discount,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
