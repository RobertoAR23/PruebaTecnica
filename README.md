# Prueba Técnica Niku Tecnología #

*Este repositorio es parte de la prueba técnica para desarrollador Full Stack*

##### Herramientas implementadas

* React
* Tailwind
* JavaScript
* React-router-dom
* GitHub
* Git

## Caso de uso
Desarrollar una aplicación web responsiva con React JS

### Implementación
Se desarrollo un archivo JSON como base de datos
```Javascript
{
    "users": [
      {
        "id": 1,
        "username": "usuario1",
        "password": "clave1"
      },
      {
        "id": 2,
        "username": "usuario2",
        "password": "clave2"
      },
      {
        "id": 3,
        "username": "usuario3",
        "password": "clave3"
      }
    ]
  }
  
```

Se establecieron las rutas

```Javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login';
import Home from './Componentes/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

Se crearon 6 componentes, de los cuales los mas destacables son

*Hora*
```Javascript
import React, { useState, useEffect } from 'react';

const Hora = () => {
    const [horaActual, setHoraActual] = useState('');

    useEffect(() => {
        const obtenerHoraActual = () => {
            const fecha = new Date();
            const hora = fecha.toLocaleTimeString();
            setHoraActual(hora);
        };

        obtenerHoraActual();

        const intervalo = setInterval(obtenerHoraActual, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return <div className='text-5xl text-center bg-escarlata text-white'>{horaActual}</div>;
};

export default Hora;

```
*Form*
```Javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userData from '../data/users.json';

export default function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsButtonEnabled(username.trim() && password.trim());
    }, [username, password]);

    const handleLogin = () => {
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
            {error && <p className='text-escarlata'>{error}</p>}
            <button
                className={`text-white p-3 rounded-md ${isButtonEnabled ? 'bg-escarlata hover:bg-red-800' : 'bg-red-200 pointer-events-none'
                    }`}
                onClick={handleLogin}
                disabled={!isButtonEnabled}
            >
                Iniciar Sesión
            </button>
        </div>
    );
}
```
*DogsList*

```Javascript
import React, { useState, useEffect } from 'react';
import Paginado from "./Paginado"

const DogsList = () => {
    const [dogsData, setDogsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 6;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.thedogapi.com/v1/breeds');
                const data = await response.json();
                setDogsData(data.slice(0, 18));
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
    }, []);

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogsData.slice(indexOfFirstDog, indexOfLastDog);
    const totalPages = Math.ceil(dogsData.length / dogsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='bg-red-400'>
            <h2 className='text-center text-white text-5xl'>Lista de Perros</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2'>
                {currentDogs.map((dog) => (
                    <div key={dog.id} className='bg-red-100 p-4 rounded-md shadow-md m-5'>
                        <h3 className='text-xl text-center font-semibold mb-2'>{dog.name}</h3>
                        <img src={dog.image.url} alt={dog.name} style={{ width: '200px' }} className='mx-auto mb-2' />
                        <p>Peso: {dog.weight.imperial} lbs ({dog.weight.metric} kg)</p>
                        <p>Altura: {dog.height.imperial} inches ({dog.height.metric} cm)</p>
                        <p>Temperamentos:</p>
                        <ul>
                            {dog.temperament && dog.temperament.split(',').slice(0, 3).map((temp, index) => (
                                <li key={index}>{temp.trim()}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <Paginado currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default DogsList;
```

*Adjunto capturas del aplicativo*

Log in
![imagen](https://github.com/RobertoAR23/PruebaTecnica/assets/102274522/d7013e8b-85f7-4186-aa8c-d87aaf83a2be)
![imagen](https://github.com/RobertoAR23/PruebaTecnica/assets/102274522/88fb366f-a712-41b7-9c9f-987fb8baca60)

Home
![imagen](https://github.com/RobertoAR23/PruebaTecnica/assets/102274522/a28934c9-fdab-4c96-9bb6-7617da4dce41)
![imagen](https://github.com/RobertoAR23/PruebaTecnica/assets/102274522/e54feb07-b3ca-4d9a-8339-c9cac1916177)
