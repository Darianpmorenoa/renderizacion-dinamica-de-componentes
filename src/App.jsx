import React, { useState } from 'react';
import Home from './components/Home.jsx'; 
import Cart from './components/Cart.jsx';
import Navbar from './components/Navbar.jsx';
import PizzaDetail from './components/Pizza.jsx'; 
import CartProvider from './Context/CartContext.jsx';
import Login from './components/Login.jsx'; 
import Footer from './components/Footer.jsx';

const App = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedPizzaId, setSelectedPizzaId] = useState(null);

  const handleViewChange = (view, id = null) => {
    setCurrentView(view);
    if (view === 'detail' && id) {
      setSelectedPizzaId(id);
    } else {
      setSelectedPizzaId(null);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onViewChange={handleViewChange} />;
      case 'cart':
        return <Cart onViewChange={handleViewChange} />;
      case 'login':
        return <Login onViewChange={handleViewChange} />;
      case 'detail':
        return <PizzaDetail pizzaId={selectedPizzaId} onViewChange={handleViewChange} />;
      default:
        return <Home onViewChange={handleViewChange} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
        <Navbar onViewChange={handleViewChange} />

        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;