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
