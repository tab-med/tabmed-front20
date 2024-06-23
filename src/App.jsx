import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login/Login';
import HomeMedico from './Components/HomeMedico/HomeMedico';
import CriarFormulario from './Components/FormularioMedico/FormularioMedico';
import HomeRecepcao from './Components/HomeRecepcao/HomeRecepcao';
import HomeCliente from './Components/HomeCliente/HomeCliente';
import HistoricoFormularios from './Components/HistoricoFormularios/HistoricoFormularios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-formulario" element={<CriarFormulario />} />
        <Route path="/historico-formularios" element={<HistoricoFormularios />} />
        <Route path="/recepcao-home" element={<HomeRecepcao />} />
        <Route path="/cliente-home" element={<HomeCliente />} />
        <Route path="/medico-home" element={<HomeMedico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
