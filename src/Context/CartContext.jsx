import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === pizza.id);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1,
        };
        return newCart;
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (id) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === id);
      if (item && item.quantity > 1) {
        return prevCart.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else if (item && item.quantity === 1) {
        return prevCart.filter(i => i.id !== id);
      }
      return prevCart;
    });
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotal = useMemo(() => () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    getTotal,
    incrementQuantity,
    decrementQuantity,
    removeItem,
  }), [cart, getTotal]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 