export const addToCart = (newProduct) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  const productExists = storedCart.find(item => item.id === newProduct.id);

  let updatedCart;
  if (productExists) {
    updatedCart = storedCart.map(item =>
      item.id === newProduct.id
        ? { ...item, quantity: (item.quantity || 1) + (newProduct.quantity || 1) }
        : item
    );
  } else {
    updatedCart = [...storedCart, { ...newProduct, quantity: newProduct.quantity || 1 }];
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart));
};
