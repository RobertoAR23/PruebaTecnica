import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userData from '../data/users.json';

export default function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        const user = userData.users.find((user) => user.username === username);

        if (user) {
            if (user.password === password) {
                alert('Inicio de sesión exitoso. ¡Bienvenido, ' + user.username + '!');
                navigate('/home');
            } else {
                setError('Contraseña incorrecta. Por favor, inténtalo nuevamente.');
            }
        } else {
            setError('El usuario no existe. Por favor, verifica tus datos.');
        }
    };

    return (
        <div className="w-full bg-white p-10 rounded-md flex flex-col justify-center items-center md:w-96">
            <h2 className="text-5xl font-semibold mb-4">Iniciar Sesión</h2>
            <div className="mb-4 w-full">
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-escarlata focus:border-transparent"
                />
            </div>
            <div className="mb-4 w-full">
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-escarlata focus:border-transparent"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="bg-escarlata text-white p-3 rounded-md hover:bg-red-800" onClick={handleLogin} disabled={!username.trim() || !password.trim()}>
                Iniciar Sesión
            </button>
        </div>
    )
}
