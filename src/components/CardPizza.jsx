import React, { useState } from 'react'; 
import { useCart } from '../context/CartContext.jsx'; 
import { Button } from 'react-bootstrap'; 

const CardPizza = ({ id, name, price, img, ingredients }) => {
    
    const { addToCart } = useCart(); 
    const [isIngredientsVisible, setIsIngredientsVisible] = useState(false);

    const toggleIngredients = () => {
        setIsIngredientsVisible(!isIngredientsVisible);
    };
    
    const handleAddToCart = () => {
        addToCart({ id, name, price, img });
    };

    return (
        <div className="card-pizza-row border rounded shadow-sm w-100 mb-3">
        
            <div className="d-flex justify-content-between align-items-center p-3">
                
                <div className="d-flex align-items-center flex-grow-1">
                    <img 
                        src={img} 
                        alt={name} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                    />
                    <span className="pizza-name fw-bold me-3">{name}</span>
                </div>
                
                <div className="d-flex align-items-center flex-shrink-0">
            
                    <span className="pizza-price me-4 fw-bold">${price.toLocaleString('es-CL')}</span>
                    
                    <Button 
                        onClick={toggleIngredients}
                        variant={isIngredientsVisible ? 'secondary' : 'info'}
                        size="sm"
                        className="text-white me-2"
                    >
                        {isIngredientsVisible ? 'Ocultar' : 'Ver más'}
                    </Button>
                    
                    <Button 
                        onClick={handleAddToCart}
                        variant="danger" 
                        size="sm"
                    >
                        Agregar al Carrito
                    </Button>
                </div>
            </div>
            
            {isIngredientsVisible && (
                <div className="ingredients-section bg-light p-3 border-top">
                    <h6 className="small fw-bold mb-1">Ingredientes:</h6>
                    <ul className="ingredients-list list-unstyled d-flex flex-wrap mb-0">
                        {ingredients && ingredients.map((ingrediente, index) => (
                            <li key={index} className="ingredient-item me-3 small">✅ {ingrediente}</li> 
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    );
};

export default CardPizza;