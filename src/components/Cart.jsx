import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap'
import { useCart } from '../context/CartContext'; 

const Cart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, calculateTotal } = useCart();
    
    if (cartItems.length === 0) {
        return (
            <Container className="my-5 text-center">
                <h3>Tu carrito está vacío 😢</h3>
                <p>¡Añade algunas pizzas  para comenzar tu pedido!</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">🛒 Detalles del Pedido</h2>
            
            <div className="cart-items-list border rounded p-3">
                {cartItems.map((item) => (
                    <Row 
                        key={item.id} 
                        className="d-flex align-items-center py-2 border-bottom"
                    >
                        <Col xs={6} md={4} className="d-flex align-items-center">
                            <img 
                                src={item.img} 
                                alt={item.name} 
                                style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px', borderRadius: '4px' }}
                            />
                            <span className="item-name fw-bold">{item.name}</span>
                        </Col>
                        <Col xs={2} md={2} className="text-end">
                            ${item.price.toLocaleString('es-CL')}
                        </Col>
                        <Col xs={4} md={3} className="d-flex justify-content-end align-items-center">
                            <div className="btn-group" role="group">
                                <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    -
                                </Button>
                                <span className="btn btn-light btn-sm px-3">{item.quantity}</span>
                                <Button 
                                    variant="outline-success" 
                                    size="sm"
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </Button>
                            </div>
                        </Col>
                        <Col xs={12} md={3} className="text-end fw-bold mt-2 mt-md-0">
                            Subtotal: ${(item.price * item.quantity).toLocaleString('es-CL')}
                        </Col>
                    </Row>
                ))}
            </div>
            <div className="cart-summary mt-4 p-3 border-top border-bottom">
                <Row className="justify-content-end">
                    <Col xs={12} md={5} className="text-end fw-bolder fs-5">
                        <p className="mb-0">Total: ${calculateTotal().toLocaleString('es-CL')}</p>
                    </Col>
                </Row>
            </div>
            
            <div className="d-grid gap-2 mt-4">
                <Button 
                    variant="dark" 
                    size="lg" 
                    onClick={() => alert('¡Compra simulada completada! Gracias por su pedido.')}
                    style={{ backgroundColor: '#212529', color: 'white' }}
                >
                    Pagar
                </Button>
            </div>
        </Container>
    );
};

export default Cart;