import React from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
// import Select from "react-select";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNome } from "../../controle/formAgenda";
import { useNomeProcedimento } from "../../controle/selectProcedimento";
import Loading from "../loading";
import Mensagem from "../../componentes/atualizar";
import { useParams } from "react-router-dom";

function AgendaEditar() {
  const { nomes } = useNome();
  const { procedimentos } = useNomeProcedimento();
  const [cliente, setCliente] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [data, setData] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [horario, setHorario] = useState("");
  const [removeLoad, setLoad] = useState(false);
  const [removeMsg, setMsg] = useState(false);
  const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("conectando");

    const Agendamento = {
      cliente,
      funcionario,
      data,
      procedimento,
      horario,
    };

    try {
      await axios.patch(`http://localhost:3002/agenda/${id}`, Agendamento);
      setLoad(true);
      setTimeout(setLoad, 500);
      if (setLoad === true) {
        setLoad = removeLoad;
      }

      setMsg(true);
      setTimeout(setMsg, 2000);
      if (setMsg === true) {
        setMsg = removeMsg;
      }
      // navegate("/publicacao");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        {removeLoad && <Loading />}
        {removeMsg && <Mensagem />}
        <h1>Atualizar Agendamento</h1>
        <FormGroup className="campos">
          <Label for="nomeFuncionario">Nome</Label>
          <Input
            type="text"
            name="cliente"
            required
            onChange={(e) => setCliente(e.target.value)}
            id="nomeFuncionario"
            placeholder="Digite o nome da cliente"
          />
        </FormGroup>
        <FormGroup className="campos">
          <Label for="cargoFuncionario">Funcionaria</Label>
          <select
            className="form-select"
            name="funcionario"
            onChange={(e) => setFuncionario(e.target.value)}
          >
            {nomes.length > 0 &&
              nomes.map((n) => <option value={n.nome}>{n.nome}</option>)}
          </select>
        </FormGroup>

        <FormGroup className="campo-telefone">
          <Label for="ProcedimentoAgenda">Procedimento</Label>
          <select
            className="form-select"
            name="procedimento"
            onChange={(e) => setProcedimento(e.target.value)}
          >
            {procedimentos.length > 0 &&
              procedimentos.map((n) => (
                <option value={n.nome}>{n.nome}</option>
              ))}
          </select>
        </FormGroup>

        <div className="endereço">
          <Label for="cargoFuncionario">Data</Label>
          <Input
            required
            type="date"
            name="data"
            id="cargoFuncionario"
            onChange={(e) => setData(e.target.value)}
            placeholder="Digite a data do atendimento"
          />

          <Label for="cargoFuncionario">Horario</Label>
          <Input
            required
            type="text"
            name="horario"
            id="cargoFuncionario"
            onChange={(e) => setHorario(e.target.value)}
            placeholder="Digite o horario do atendimento"
          />
        </div>

        <div className="btn1">
          <Button color="primary" type="submit" size="lg" block>
            Atualizar
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AgendaEditar;

// const { id } = useParams();
// const [onecliente, setClienteOne] = useState([]);

// // async function handleSubmit(e) {
// //   e.preventDefault();

// const getClienteAgenda = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3002/agenda/${id}`);
//     const data = response.data;
//     setClienteOne(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   getClienteAgenda();
// }, []);
