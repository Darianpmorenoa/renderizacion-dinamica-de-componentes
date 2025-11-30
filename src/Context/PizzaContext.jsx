import React, { createContext, useContext, useState, useEffect } from 'react';

const PizzaContext = createContext();

// Hook Personalizado
export const usePizza = () => {
    const context = useContext(PizzaContext);
    if (!context) {
        throw new Error('usePizza debe ser usado dentro de un PizzaProvider');
    }
    return context;
};

// Proveedor del Contexto
export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
            
                const response = await fetch('/pizzas.json'); 
                
                if (!response.ok) {
                    throw new Error(`Error al cargar el archivo de menú. Código de estado: ${response.status}.`);
                }
                
                const data = await response.json(); 
                setPizzas(data);
                
            } catch (err) {
                console.error("Error fetching pizzas:", err);
              
                setError(`No se pudo cargar el menú. Asegúrate de que pizzas.json esté en la carpeta /public y tenga el formato JSON correcto. (Error: ${err.message})`);
            } finally {
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    // Valor que se proveerá a los componentes
    const contextValue = {
        pizzas,
        loading,
        error,
    };

    return (
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    );
};