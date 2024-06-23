import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormularioMedico.css';
import { useNavigate } from 'react-router-dom';

function FormularioMedico() {
  const [dados, setDados] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/usuarios?tipoAcesso=3')
      .then(response => setPacientes(response.data))
      .catch(error => console.error('Erro ao buscar pacientes:', error));
  }, []);

  const handleSubmit = async () => {
    if (!pacienteSelecionado) {
      alert('Selecione um paciente antes de enviar o formulário.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/formularios/cadastro', {
        dados,
        medico: { id: 1 }, // Substituir ID do médico
        paciente: { id: pacienteSelecionado },
      });
      alert('Formulário cadastrado com sucesso');
    } catch (error) {
      alert('Erro ao cadastrar formulário');
    }
  };

  const handleVoltarClick = () => {
    navigate('/medico-home'); // Redirecionar para HomeMedico
  };

  return (
    <div className="formulario-medico">
      <button className="botao-voltar" onClick={handleVoltarClick}>Voltar</button>

      <h1>Home Médico</h1>
      <textarea
        className="formulario-medico-textarea"
        placeholder="Dados do formulário"
        value={dados}
        onChange={(e) => setDados(e.target.value)}
      />

      <button onClick={() => setShowModal(true)}>Selecionar Paciente</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Selecionar Paciente</h2>
            <select value={pacienteSelecionado} onChange={(e) => setPacienteSelecionado(Number(e.target.value))}>
              <option value="">Selecione um paciente</option>
              {pacientes.map(paciente => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome} {paciente.sobrenome}
                </option>
              ))}
            </select>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}

      <button onClick={handleSubmit}>Cadastrar Formulário</button>
    </div>
  );
}

export default FormularioMedico;
