import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [senhaValida, setSenhaValida] = useState(true);

  const handleSenhaChange = (e) => {
    const novaSenha = e.target.value;
    setSenha(novaSenha);

    // Validação da senha (pelo menos 6 caracteres, 1 letra e 1 número)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setSenhaValida(regex.test(novaSenha));
  };

  const handleLogin = async () => {
    // Verifica se a senha é válida antes de prosseguir
    if (!senhaValida) {
      setError('Login ou Senha incorreta!');
      return; 
    }

    setIsLoading(true);
    setError(null); // Limpa o erro anterior

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', { cpf, senha });
      const usuario = response.data;

      // Redirecionar com base no tipoAcesso
      if (usuario.tipoAcesso === 1) {
        window.location.href = '/medico-home';
      } else if (usuario.tipoAcesso === 2) {
        window.location.href = '/recepcao-home';
      } else if (usuario.tipoAcesso === 3) {
        window.location.href = '/cliente-home';
      }
    } catch (error) {
      setError('CPF ou senha inválidos');
    } finally {
      setIsLoading(false);
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
        onChange={handleSenhaChange} // Chama a função de validação
      />

      {!senhaValida && (
        <p style={{ color: 'red' }}>
          A senha deve ter pelo menos 6 caracteres, 1 letra e 1 número.
        </p>
      )}

      {isLoading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <button onClick={handleLogin} disabled={isLoading}>Login</button> {/* Desabilita o botão enquanto carrega */}
    </div>
  );
}

export default Login;
