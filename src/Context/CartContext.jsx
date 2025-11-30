import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

// Hook Personalizado
export const useCart = () => {
    const context = useContext(CartContext);
    // Verificación de contexto
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

// Proveedor del Contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 

    // **Lógica para AÑADIR/INCREMENTAR (compatible con addToCart en CardPizza)**
    const addToCart = (productToAdd) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...productToAdd, quantity: 1 }];
            }
        });
    };

    // **Lógica para ELIMINAR/DECREMENTAR (compatible con removeFromCart en Cart.jsx)**
    const removeFromCart = (product, decreaseOnly = false) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (!existingItem) return prevCart; 

            if (decreaseOnly && existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter(item => item.id !== product.id);
            }
        });
    };

    // Lógica para VACiar el carrito
    const clearCart = () => {
        if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
             setCart([]);
        }
    };
    
    // **CALCULADO: Total del carrito (Optimizado con useMemo)**
    const total = useMemo(() => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [cart]);

    // **CALCULADO: Cantidad total de items (para el ícono de la Navbar)**
    const itemCount = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }, [cart]);


    const contextValue = {
        cart,
        total,
        itemCount, 
        addToCart, 
        removeFromCart, 
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};