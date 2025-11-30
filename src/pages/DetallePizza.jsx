import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePizza } from '../Context/PizzaContext.jsx';
import { useCart } from '../Context/CartContext.jsx';

// Función de formato de moneda
const formatCurrency = (amount) => {
    return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
};

const DetallePizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { pizzas, loading, error } = usePizza();
    const { addToCart } = useCart();

    if (loading) return <div className="text-center py-20">Cargando detalles...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

    const pizza = pizzas.find((p) => p.id === id);

    if (!pizza) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-red-700 mb-4">Pizza no encontrada</h1>
                <p className="text-lg text-gray-600">El ID de pizza "{id}" no existe en el menú.</p>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    Volver al Menú
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(pizza);
        alert(`¡${pizza.name} añadida al carrito!`); 
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden my-10">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img 
                        className="h-96 w-full object-cover md:w-96" 
                        src={pizza.img} 
                        alt={`Pizza ${pizza.name}`}
                    />
                </div>
                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-red-700 mb-3">
                            {pizza.name}
                        </h1>
                        <p className="mt-2 text-gray-700 border-b pb-4 mb-4">
                            {pizza.desc}
                        </p>

                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-800 mb-2">Ingredientes:</p>
                            <div className="flex flex-wrap gap-2">
                                {pizza.ingredients.map((ing) => (
                                    <span key={ing} className="bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center pt-4 border-t">
                        <span className="text-3xl font-extrabold text-green-600">
                            {formatCurrency(pizza.price)}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg flex items-center space-x-2"
                        >
                            <span>Añadir al Carrito</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallePizza;