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
