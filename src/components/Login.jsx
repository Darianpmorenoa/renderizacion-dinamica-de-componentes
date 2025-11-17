import React from 'react';
const Login = ({ onViewChange }) => {
  return (
    <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-md mx-auto my-10">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Acceso de Usuario</h1>
      <p className="text-gray-600 mb-8">Esta es una vista de marcador de posición para el formulario de Login.</p>
      
      {/* Formulario de Malla */}
      <form className="space-y-4">
        <input 
          type="email" 
          placeholder="Correo Electrónico"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
        <button 
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
        >
          Iniciar Sesión
        </button>
      </form>

      <button
        onClick={() => onViewChange('home')}
        className="mt-6 text-sm text-red-500 hover:text-red-700 transition duration-200"
      >
        Volver a Inicio
      </button>
    </div>
  );
};

export default Login;