import React, { useState } from 'react';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext'; 

const mainContentStyles = {
    minHeight: '60vh',
    maxWidth: '1000px',
    margin: '30px auto',
    padding: '20px',
};

const App = () => {
    const [currentView, setCurrentView] = useState('home');

    const setCurrentViewHandler = (viewName) => {
        setCurrentView(viewName);
    };

    const renderContent = () => {
        if (currentView === 'login') {
            return <Login onViewChange={setCurrentViewHandler} />;
        }
        if (currentView === 'cart') {
            return <Cart />;
        }
        return <Home onViewChange={setCurrentViewHandler} />; 
    };

    return (
        <CartProvider>
            <div className="App">
                <Navbar onViewChange={setCurrentViewHandler} />
                <main style={mainContentStyles}>
                    {renderContent()}
                </main>
                <Footer />
            </div>
        </CartProvider>
    );
};

export default App;