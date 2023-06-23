import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNome } from "../../controle/formAgenda";
import { useNomeProcedimento } from "../../controle/selectProcedimento";
import Loading from "../loading";
import Mensagem from "../../componentes/messagem";

function FormVendas() {
  const { nomes } = useNome();
  const { procedimentos } = useNomeProcedimento();
  const [cliente, setCliente] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [valor, setValor] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [removeLoad, setLoad] = useState(false);
  const [removeMsg, setMsg] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const Vendas = {
      cliente,
      funcionario,
      procedimento,
      formaPagamento,
      valor,
    };

    try {
      await axios.post("http://localhost:3002/venda", Vendas);
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
      setValor("");
      setFuncionario("");
      setProcedimento("");
      setFormaPagamento("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        {removeLoad && <Loading />}
        {removeMsg && <Mensagem />}
        <h1>Pagamento</h1>
        <FormGroup className="campos">
          <Label for="nomeFuncionario">Nome</Label>
          <Input
            onChange={(e) => setCliente(e.target.value)}
            type="text"
            name="cliente"
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
          <Label for="cargoFuncionario">Valor</Label>
          <Input
            type="text"
            name="valor"
            id="cargoFuncionario"
            placeholder="valor  do pagamento"
            onChange={(e) => setValor(e.target.value)}
          />

          <Label for="cargoFuncionario">Forma de pagamento</Label>
          <Input
            type="text"
            name="formapagamento"
            id="cargoFuncionario"
            placeholder="forma de pagamento"
            onChange={(e) => setFormaPagamento(e.target.value)}
          />
        </div>

        <div className="btn1">
          <Button color="primary" type="submit" size="lg" block>
            Cadastrar
          </Button>
        </div>
        <Link className="link" to="/lista-vendas">
          <div className="btn1">
            <Button color="success" size="lg" block>
              Vendas realizadas
            </Button>
          </div>
        </Link>
      </div>
    </form>
  );
}

export default FormVendas;
