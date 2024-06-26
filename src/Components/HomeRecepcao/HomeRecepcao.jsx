import React, { useState } from 'react';
import axios from 'axios';
import './HomeRecepcao.css';
import { useNavigate } from 'react-router-dom';

function HomeRecepcao() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoAcesso, setTipoAcesso] = useState(3);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/cadastro', {
        nome,
        sobrenome,
        cpf,
        senha,
        tipoAcesso,
      });
      alert('Usuário cadastrado com sucesso');
    } catch (error) {
      alert('Erro ao cadastrar usuário');
    }
  };

  const handleLogoffClick = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="home-recepcao-container">
      <button className="logoff-button" onClick={handleLogoffClick}>
        Logoff
      </button>

      <div className="home-recepcao">
        <h1 className="home-recepcao">Home Recepção</h1>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
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
          onChange={(e) => setSenha(e.target.value)}
        />
        <select
          value={tipoAcesso}
          onChange={(e) => setTipoAcesso(Number(e.target.value))}
        >
          <option value={1}>Médico</option>
          <option value={2}>Recepção</option>
          <option value={3}>Cliente</option>
        </select>
        <button onClick={handleSubmit}>Cadastrar Usuário</button>
      </div>
    </div>
  );
}
export default HomeRecepcao;
