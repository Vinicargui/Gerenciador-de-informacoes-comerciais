import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "../loading";
import Mensagem from "../../componentes/messagem";
import "./style.css";

function FormProcedimento() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [removeLoad, setLoad] = useState(false);
  const [removeMsg, setMsg] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("conectando");

    const procedimento = {
      nome,
      valor,
    };

    try {
      await axios.post("http://localhost:3002/procedimento", procedimento);
      setLoad(true);
      setTimeout(setLoad, 1000);
      if (setLoad === true) {
        setLoad = removeLoad;
      }
      setMsg(true);
      setTimeout(setMsg, 2000);
      if (setMsg === true) {
        setMsg = removeMsg;
      }

      setNome("");
      setValor("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        {removeLoad && <Loading />}
        {removeMsg && <Mensagem />}
        <h1>Cadastrar novo Procedimento</h1>
        <FormGroup className="campos">
          <Label for="nomeFuncionario">Nome do procedimento</Label>
          <Input
            required
            type="text"
            value={nome}
            name="nome"
            id="nomeFuncionario"
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do Procedimento"
          />
        </FormGroup>
        <FormGroup className="campos">
          <Label for="nomeFuncionario">Valor do procedimento</Label>
          <Input
            required
            value={valor}
            type="text"
            name="valor"
            id="nomeFuncionario"
            onChange={(e) => setValor(e.target.value)}
            placeholder="Digite o valor do Procedimento"
          />
        </FormGroup>
        <div className="btn1">
          <Button color="primary" type="submit" size="lg" block>
            Cadastrar
          </Button>
        </div>
        <div className="btn1">
          <Link className="link" to="/lista-procedimento">
            <Button color="success" size="lg" block>
              Listar Procedimentos
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default FormProcedimento;
