import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const { login } = useAuth(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "user@mail.com" && password === "1234") {
            // Datos simulados del usuario
            const mockToken = "jwt-12345-user-token";
            const userData = { email, name: "María", role: "Cliente" };
            
            login(userData, mockToken); // Autentica al usuario en el Contexto
            
            alert(`¡Bienvenida de vuelta, ${userData.name}!`);
            navigate('/'); // Redirige al Home
            
        } else if (email === "admin@mail.com" && password === "1234") {
            // Datos simulados del administrador
            const mockToken = "jwt-98765-admin-token";
            const userData = { email, name: "Darian", role: "Admin" };
            
            login(userData, mockToken); 
            
            alert(`¡Bienvenido administrador, ${userData.name}!`);
            navigate('/'); 

        } else {
            alert('Error: Credenciales inválidas. Intenta con user@mail.com y 1234.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-600">
                <h2 className="text-3xl font-extrabold text-red-700 text-center mb-6">
                    Iniciar Sesión
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo de Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="user@mail.com o admin@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Campo de Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
                            placeholder="1234"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Botón de Submit */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="font-medium text-red-600 hover:text-red-500 transition duration-300">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;