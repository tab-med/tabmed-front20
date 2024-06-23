import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigate } from 'react-router-dom';

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
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {nomeMedico}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleCriarFormularioClick}>
        <Text style={styles.buttonText}>Criar Formulário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHistoricoFormulariosClick}>
        <Text style={styles.buttonText}>Histórico de Formulários</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10, // Adicionei um espaçamento entre os botões
    width: '100%', // Faz o botão ocupar toda a largura
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeMedico;
