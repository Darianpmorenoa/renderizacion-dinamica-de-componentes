import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();
export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (pizza) => {
        setCartItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.id === pizza.id);
            
            if (itemIndex > -1) {
                const newItems = [...prevItems];
                newItems[itemIndex] = {
                    ...newItems[itemIndex],
                    quantity: newItems[itemIndex].quantity + 1,
                };
                return newItems;
            } else {
                return [...prevItems, { ...pizza, quantity: 1 }];
            }
        });
    };
    
    const increaseQuantity = (id) => {
        setCartItems(prevItems => {
            return prevItems.map(item => 
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const decreaseQuantity = (id) => {
        setCartItems(prevItems => {
            return prevItems.flatMap(item => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        return [{ ...item, quantity: item.quantity - 1 }];
                    } 
                    return [];
                }
                return [item];
            });
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const contextValue = {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};