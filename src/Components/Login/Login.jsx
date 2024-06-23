import React, { useState } from 'react';
import userService from '../../services/userService';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [senhaValida, setSenhaValida] = useState(true);
  const navigate = useNavigate();

  const handleSenhaChange = (e) => {
    const novaSenha = e.target.value;
    setSenha(novaSenha);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setSenhaValida(regex.test(novaSenha));
  };

  const handleLogin = async () => {
    if (!senhaValida) {
      setError('A senha deve ter pelo menos 6 caracteres, 1 letra e 1 número.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', { cpf, senha });
      const usuario = response.data;

      localStorage.setItem('usuario', JSON.stringify(usuario));
      
      if (usuario.tipoAcesso === 1) {
        navigate('/medico-home');
      } else if (usuario.tipoAcesso === 2) {
        navigate('/recepcao-home');
      } else if (usuario.tipoAcesso === 3) {
        navigate('/cliente-home');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data || 'Erro no servidor');
      } else if (error.request) {
        setError('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        setError('Erro ao fazer login. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={handleSenhaChange}
          className="input-field"
        />

        {!senhaValida && (
          <p className="error-message">
            A senha deve ter pelo menos 6 caracteres, 1 letra e 1 número.
          </p>
        )}

        {isLoading && <p className="loading-message">Carregando...</p>}
        {error && <p className="error-message">{error}</p>}

        <button onClick={handleLogin} disabled={isLoading} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
