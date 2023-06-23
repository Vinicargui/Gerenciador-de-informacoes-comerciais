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
import Mensagem from "../../componentes/messagem";

function FormAgenda() {
  const { nomes } = useNome();
  const { procedimentos } = useNomeProcedimento();

  const [cliente, setCliente] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [data, setData] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [horario, setHorario] = useState("");
  const [removeLoad, setLoad] = useState(false);
  const [removeMsg, setMsg] = useState(false);

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
      await axios.post("http://localhost:3002/agenda", Agendamento);
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

      setCliente("");
      setData("");
      setFuncionario("");
      setHorario("");
      setProcedimento("");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(nomes);
  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        {removeLoad && <Loading />}
        {removeMsg && <Mensagem />}
        <h1>Cadastrar novo Agendamento</h1>
        <FormGroup className="campos">
          <Label for="nomeFuncionario">Nome</Label>
          <Input
            type="text"
            name="cliente"
            required
            value={cliente}
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
            value={data}
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
            value={horario}
            type="text"
            name="horario"
            id="cargoFuncionario"
            onChange={(e) => setHorario(e.target.value)}
            placeholder="Digite o horario do atendimento"
          />
        </div>

        <div className="btn1">
          <Button color="primary" type="submit" size="lg" block>
            Cadastrar
          </Button>
        </div>
        <div className="btn1">
          <Link className="link" to="/lista">
            <Button color="success" size="lg" block>
              Listar Agendamentos
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default FormAgenda;
