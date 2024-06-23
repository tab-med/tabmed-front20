import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeCliente.css'; // Importar o arquivo CSS
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeCliente() {
  const [formularios, setFormularios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/formularios/medico/1'); // Substituir ID do médico
        setFormularios(response.data);
      } catch (error) {
        alert('Erro ao buscar formulários');
      }
    };
    fetchFormularios();
  }, []);


  const handleLogoffClick = () => {
    AsyncStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        <h1>Home Cliente</h1>
        <nav>
          <button className="botao-logoff" onClick={handleLogoffClick}>Logout</button>
        </nav>
      </header>
      <main>
        <ul>
          {formularios.map((formulario) => (
            <li key={formulario.id}>{formulario.dados}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default HomeCliente;
