import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx'; 

const formatCurrency = (amount) => {
    return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
};

const CardPizza = ({ pizza }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleViewDetails = () => {
        navigate(`/pizza/${pizza.id}`);
    };

    const handleAddToCart = () => {
        addToCart(pizza);
        alert(`¡${pizza.name} añadida al carrito!`);
    };

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02]">
            <img 
                src={pizza.img} 
                alt={`Pizza ${pizza.name}`} 
                className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">
                    {pizza.name}
                </h2>
                
                <p className="text-gray-600 font-semibold mb-2">Ingredientes:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {pizza.ingredients.map((ing) => (
                        <span key={ing} className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {ing}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-2xl font-extrabold text-green-600">
                        {formatCurrency(pizza.price)}
                    </span>
                    
                    <div className="flex space-x-2">
                        <button 
                            onClick={handleViewDetails}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 shadow-md"
                        >
                            Ver Más
                        </button>
                        <button 
                            onClick={handleAddToCart}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 shadow-md"
                        >
                            Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPizza;