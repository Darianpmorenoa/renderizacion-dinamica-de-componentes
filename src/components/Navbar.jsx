import React from 'react';
import { useCart } from '../context/CartContext.jsx'; 

const Navbar = ({ onViewChange }) => {
    
    const { cartItems, calculateTotal } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = calculateTotal();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a 
                    className="navbar-brand" 
                    href="#!" 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        onViewChange('home');
                    }}
                >
                    🍕 Pizzería Mamma Mia!
                </a>
                
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                    
                        <li className="nav-item">
                            <a className="nav-link" href="#!" onClick={(e) => { e.preventDefault(); onViewChange('home'); }}>
                                Home
                            </a>
                        </li>
                    
                        <li className="nav-item">
                            <a className="nav-link" href="#!" onClick={(e) => { e.preventDefault(); onViewChange('login'); }}>
                                Acceso
                            </a>
                        </li>
                        
                        <li className="nav-item">
                            <button
                                className="btn btn-info text-white ms-3 d-flex align-items-center"
                                onClick={() => onViewChange('cart')} 
                            >
                                🛒 
                                <span className="badge bg-danger ms-1 me-2">{itemCount}</span>
                                
                                ${totalAmount.toLocaleString('es-CL')}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;