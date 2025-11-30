import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx'; 
import { useAuth } from '../Context/AuthContext.jsx'; 

const formatCurrency = (amount) => {
    return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
};

const Navbar = () => {
    // Contexto del Carrito
    const { total, itemCount } = useCart();
    
    // Contexto de Autenticación
    const { user, logout, isAuthenticated } = useAuth(); 
    
    const navigate = useNavigate();

    return (
        <nav className="bg-red-700 shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logotipo y Link a Home */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-extrabold hover:text-red-100 transition duration-150">
                            <span className="text-3xl">🍕</span>
                            <span>Pizzería MammaMia</span>
                        </Link>
                    </div>

                    {/* Elementos de Navegación, Auth y Carrito */}
                    <div className="flex items-center space-x-4">
                    
                        {isAuthenticated ? (
                            <>
                                <span className="text-white hidden md:inline font-semibold">
                                    Hola, {user.name}
                                </span>
                                <button 
                                    onClick={logout} 
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-white hover:text-red-300 transition duration-150 font-medium"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-white text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-100 transition duration-150 shadow-md"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}

                        {/* Botón/Link del Carrito */}
                        <button 
                            onClick={() => navigate('/cart')}
                            className="relative flex items-center bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-3 rounded-full transition duration-300 shadow-md transform hover:scale-105 ml-4"
                        >
                            {/* Icono del Carrito */}
                            <span className="text-2xl mr-2">🛒</span>
                            
                            {/* Mostrar Total */}
                            <span className="text-lg font-semibold hidden sm:inline">
                                {formatCurrency(total)}
                            </span>

                            {/* Insignia de Cantidad */}
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;