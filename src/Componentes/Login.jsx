import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userData from '../data/users.json';

const Login = () => {
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
                // Usuario y contraseña válidos, realizar acciones de inicio de sesión exitoso
                alert('Inicio de sesión exitoso. ¡Bienvenido, ' + user.username + '!');
                navigate('/home');
            } else {
                // Contraseña incorrecta
                setError('Contraseña incorrecta. Por favor, inténtalo nuevamente.');
            }
        } else {
            // Usuario no existe
            setError('El usuario no existe. Por favor, verifica tus datos.');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin} disabled={!username.trim() || !password.trim()}>
                Iniciar Sesión
            </button>
        </div>
    );
};

export default Login;
