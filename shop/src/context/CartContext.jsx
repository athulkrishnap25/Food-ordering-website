import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(
        (item) => item.foodName === product.foodName
      );

      if (exists) {
        return prevItems.map((item) =>
          item.foodName === product.foodName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.foodName === productName
      );

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.foodName !== productName);
      } else {
        return prevItems.map((item) =>
          item.foodName === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
