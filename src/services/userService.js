import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios'; 

const userService = {
  login: async (cpf, senha) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { cpf, senha });
      return response.data; 
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Erro no servidor. Tente novamente mais tarde.';
        console.error('Erro de login:', errorMessage);
        throw new Error(errorMessage);
      } else if (error.request) {
        console.error('Erro de login: Sem resposta do servidor.');
        throw new Error('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        console.error('Erro de login:', error.message);
        throw new Error('Erro ao fazer login. Tente novamente mais tarde.');
      }
    }
  },
};

export default userService;
