import React from 'react';
import { Container, Button } from 'react-bootstrap';
import CardPizza from './CardPizza';
import pizzas from '../data/pizzas';
import { useCart } from '../context/CartContext.jsx'; 

const Home = ({ onViewChange }) => {
    
    const { cartItems, calculateTotal } = useCart(); 
    const totalAmount = calculateTotal();
    
    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">Nuestro Menú</h1>

            <div className="d-grid gap-4">
                {pizzas.map((pizza) => (
                    <CardPizza 
                        key={pizza.id} 
                        {...pizza} 
                    />
                ))}
            </div>
            <div className="d-grid gap-2 mt-5">
                <Button 
                    variant="dark" 
                    size="lg" 
                    onClick={() => onViewChange('cart')}
                    disabled={totalAmount === 0}
                    style={{ backgroundColor: '#212529', color: 'white' }} 
                >
                    Ir a Pagar (Total: ${totalAmount.toLocaleString('es-CL')})
                </Button>
            </div>
            
        </Container>
    );
};

export default Home;