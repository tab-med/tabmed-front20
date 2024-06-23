import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function HistoricoFormularios() {
  const navigate = useNavigate();
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    // ... (lógica para buscar formulários da API)
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* ... (exibição dos dados do formulário) */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Formulários</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigate(-1)}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <FlatList
        data={formularios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#ccc', // Cor de fundo do botão "Voltar"
    padding: 10,
    borderRadius: 8,
    marginBottom: 10, // Espaçamento entre o botão e a lista
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HistoricoFormularios;
