import React from 'react';
import { useCart } from '../context/CartContext.jsx'; 

const Navbar = ({ onViewChange }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-red-800 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Nombre de la Pizzería */}
        <div 
          className="text-white text-3xl font-extrabold cursor-pointer transition duration-300 hover:text-red-300" 
          onClick={() => onViewChange('home')}
        >
          Mamma Mia! 🍕
        </div>

        {/* Links de Navegación y Carrito */}
        <nav className="flex items-center space-x-6">
          
          {/* Link Inicio */}
          <button 
            onClick={() => onViewChange('home')}
            className="text-white font-semibold transition duration-300 hover:text-red-300 text-lg"
          >
            Inicio
          </button>
          
          {/* Link Carrito */}
          <button 
            onClick={() => onViewChange('cart')}
            className="relative p-2 rounded-full text-white bg-red-700 hover:bg-red-600 transition duration-300 flex items-center space-x-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {/* Contador de artículos en el carrito */}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full">
              {totalItems}
            </span>
          </button>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;