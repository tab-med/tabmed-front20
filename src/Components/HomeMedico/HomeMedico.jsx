import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    <View style={{ flex: 1, backgroundColor: '#007bff' }}> 
      <View className="container">
        <Text className="title">Bem-vindo, {nomeMedico}!</Text>
        <View className="button-container">
          <TouchableOpacity className="button" onPress={handleCriarFormularioClick}>
            <Text className="buttonText">Criar Formulário</Text>
          </TouchableOpacity>
          <TouchableOpacity className="button" onPress={handleHistoricoFormulariosClick}>
            <Text className="buttonText">Histórico de Formulários</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default HomeMedico;
