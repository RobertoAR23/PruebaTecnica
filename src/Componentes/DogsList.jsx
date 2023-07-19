import React, { useState, useEffect } from 'react';

const DogsList = () => {
    const [dogsData, setDogsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.thedogapi.com/v1/breeds');
                const data = await response.json();
                setDogsData(data.slice(0, 15));
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Lista de Perros</h2>
            <ul>
                {dogsData.map((dog) => (
                    <li key={dog.id}>
                        <h3>{dog.name}</h3>
                        <img src={dog.image.url} alt={dog.name} style={{ width: '200px' }} />
                        <p>Peso: {dog.weight.imperial} lbs ({dog.weight.metric} kg)</p>
                        <p>Altura: {dog.height.imperial} inches ({dog.height.metric} cm)</p>
                        <p>Temperamentos:</p>
                        <ul>
                            {dog.temperament && dog.temperament.split(',').slice(0, 3).map((temp, index) => (
                                <li key={index}>{temp.trim()}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DogsList;
