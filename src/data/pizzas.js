import React, { useState, useEffect } from 'react';

function MenuDePizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = 'http://localhost:5001/api/pizzas'; 

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPizzas(data); 
      })
      .catch(error => {
        console.error("Hubo un problema al obtener las pizzas:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  if (loading) return <div>Cargando menú...</div>;
  if (error) return <div>Error: No se pudo cargar el menú. Revisa la consola para más detalles.</div>;

  return (
    <div>
      <h2>Nuestro Menú de Pizzas 🍕</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            <h3>{pizza.nombre}</h3>
            <p>{pizza.descripcion}</p>
            <p>Precio: ${pizza.precio}</p>
            <img src={pizza.imagen} alt={pizza.nombre} style={{ width: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDePizzas;