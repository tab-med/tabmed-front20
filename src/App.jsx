import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomeMedico from './pages/HomeMedico';
import CriarFormulario from './pages/FormularioMedico';
import HomeRecepcao from './pages/HomeRecepcao';
import HomeCliente from './pages/HomeCliente';
import HistoricoFormularios from './pages/HistoricoFormularios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeMedico />} />
        <Route path="/criar-formulario" element={<CriarFormulario />} />
        <Route path="/historico-formularios" element={<HistoricoFormularios />} />
        <Route path="/recepcao-home" element={<HomeRecepcao />} />
        <Route path="/cliente-home" element={<HomeCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
