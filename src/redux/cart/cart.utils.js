export const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.item._id === itemToAdd._id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.item._id === itemToAdd._id ?
        { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { item: itemToAdd, quantity: 1, checked: false }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.item._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.item._id !== cartItemToRemove._id)
  }

  return cartItems.map(cartItem =>
    cartItem.item._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

export const toggleCheck = (cartItems, itemToToggle) =>
  cartItems.map(cartItem =>
    cartItem.item._id === itemToToggle._id ?
      { ...cartItem, checked: !cartItem.checked }
      : cartItem
  )
