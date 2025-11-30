import React from 'react';
import { useCart } from '../Context/CartContext.jsx';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

const formatCurrency = (amount) => {
    return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
};

const Cart = () => {
    const { cart, total, addToCart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-3">
                    Tu Carrito .
                </h1>

                {/* Mensaje de Carrito Vacío */}
                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg shadow-lg">
                        <p className="text-2xl text-gray-600 mb-4">
                            🍕 Tu carrito está vacío. ¡Es hora de pedir una pizza!
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
                        >
                            Ver Menú
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Lista de Items en el Carrito */}
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-100">

                                    <div className="flex items-center space-x-4 flex-grow">
                                        <img 
                                            src={item.img} 
                                            alt={item.name} 
                                            className="w-16 h-16 object-cover rounded-md" 
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/A0AEC0/FFFFFF?text=Pizza" }}
                                        />
                                        <span className="text-lg font-semibold text-gray-800 flex-grow">{item.name}</span>
                                    </div>

                                    <div className="flex items-center space-x-3 mx-4">
                                        <button
                                            onClick={() => removeFromCart(item, true)} // Usamos 'true' para indicar que queremos reducir la cantidad
                                            className="text-white bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold transition duration-150"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="text-white bg-green-500 hover:bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold transition duration-150"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                
                                    <div className="text-right w-32">
                                        <span className="text-xl font-bold text-green-600">
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen y Botones de Pago */}
                        <div className="mt-8 p-6 bg-red-50 rounded-lg shadow-xl">
                            <div className="flex justify-between items-center text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                                <span>Total a Pagar:</span>
                                <span className="text-4xl font-extrabold text-red-700">{formatCurrency(total)}</span>
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={clearCart}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
                                >
                                    Vaciar Carrito
                                </button>
                                <button
                                    /* logica de pago */
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
                                >
                                    Ir a Pagar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Cart;