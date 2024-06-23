import React, { useState } from 'react';
import userService from '../../services/userService';

function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [senhaValida, setSenhaValida] = useState(true);

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
      // Redirecionar com base no tipoAcesso
      if (usuario.tipoAcesso === 1) {
          navigate('/medico-home');
      } else if (usuario.tipoAcesso === 2) {
          navigate('/recepcao-home');
      } else if (usuario.tipoAcesso === 3) {
          navigate('/cliente-home');
      }
  } catch (error) {
      alert('Login falhou');
  }

    try {
      const usuario = await userService.login(cpf, senha);

      // Redirecionamento (agora usando localStorage para armazenar dados do usuário)
      localStorage.setItem('usuario', JSON.stringify(usuario));
      if (usuario.tipoAcesso === 1) {
        window.location.href = '/medico-home';
      } else if (usuario.tipoAcesso === 2) {
        window.location.href = '/recepcao-home';
      } else if (usuario.tipoAcesso === 3) {
        window.location.href = '/cliente-home';
      }
    } catch (error) {
      setError(error.message); // Exibe a mensagem de erro específica
    } finally {
      setIsLoading(false);
    }
    try {
      const usuario = await userService.login(cpf, senha);
      // ...
    } catch (error) {
      if (error.response) {
        // Erro do servidor (ex: 401, 500, etc.)
        setError(error.response.data || 'Erro no servidor');
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        setError('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        // Algo aconteceu ao configurar a requisição
        setError('Erro ao fazer login. Tente novamente mais tarde.');
      }
    }
  
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={handleSenhaChange}
      />

      {!senhaValida && (
        <p style={{ color: 'red' }}>
          A senha deve ter pelo menos 6 caracteres, 1 letra e 1 número.
        </p>
      )}

      {isLoading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
    </div>
  );
}

export default Login;
