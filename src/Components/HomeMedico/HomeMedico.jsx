import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigate } from 'react-router-dom';
import './HomeMedico.css'; 

function HomeMedico() {
  const navigate = useNavigate();
  const [nomeMedico, setNomeMedico] = useState('');

  useEffect(() => {
    const fetchNomeMedico = async () => {
      try {
        const usuarioJSON = await AsyncStorage.getItem('usuario');
        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);
          setNomeMedico(usuario.nome);
        }
      } catch (error) {
        console.error('Erro ao buscar nome do médico:', error);
      }
    };

    fetchNomeMedico();
  }, []);

  const handleCriarFormularioClick = () => {
    navigate('/criar-formulario');
  };

  const handleHistoricoFormulariosClick = () => {
    navigate('/historico-formularios');
  };

  return (
    <div className="container"> 
      <p className="title">Bem-vindo, {nomeMedico}!</p> 
      <div className="button-container">
        <button className="button" onClick={handleCriarFormularioClick}>
          <span className="buttonText">Criar Formulário</span> 
        </button>
        <button className="button" onClick={handleHistoricoFormulariosClick}>
          <span className="buttonText">Histórico de Formulários</span> 
        </button>
      </div>
    </div>
  );
}

export default HomeMedico;
