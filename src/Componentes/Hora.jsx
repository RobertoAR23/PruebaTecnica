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
