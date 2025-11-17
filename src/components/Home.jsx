import React, { useState, useEffect } from 'react';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5001/api/pizzas'; 

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch(API_URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                setPizzas(data);
                setError(null); 

            } catch (err) {
                console.error("Fallo la conexión o la obtención de datos:", err);
                setError(`Error de conexión o datos: ${err.message} ${API_URL}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    if (isLoading) {
        return <div className="text-center p-8">Cargando Pizzas...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto my-8 max-w-lg" role="alert">
                <strong className="font-bold">¡Error de Conexión!</strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Nuestro Menú</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pizzas.map(pizza => (
                    <div key={pizza.id} className="border p-4 rounded shadow-lg">
                        <h2 className="text-xl font-semibold">{pizza.nombre}</h2>
                        <p>{pizza.descripcion}</p>
                        <p className="font-bold">${pizza.precio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;