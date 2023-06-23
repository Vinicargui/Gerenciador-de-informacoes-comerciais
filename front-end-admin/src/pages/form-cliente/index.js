import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, FormGroup, Label, Input } from "reactstrap";
import Loading from "../loading";
import { Link } from "react-router-dom";
import Mensagem from "../../componentes/messagem";
import "./style.css";

function FormCliente() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [removeLoad, setLoad] = useState(false);
  const [removeSucesso, setMsm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("conectado");

    const cliente = {
      nome,
      telefone,
      email,
    };

    try {
      await axios.post("http://localhost:3002/cliente", cliente);
      setLoad(true);
      setTimeout(setLoad, 500);
      if (setLoad === true) {
        setLoad = removeLoad;
      }

      setMsm(true);
      setTimeout(setMsm, 1000);
      if (setMsm === true) {
        setMsm = removeSucesso;
      }
      setNome("");
      setTelefone("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        {removeLoad && <Loading />}
        {removeSucesso && <Mensagem />}
        <h1>Cadastrar novo cliente</h1>
        <FormGroup className="campos">
          <Label for="nomeCliente">Nome</Label>
          <Input
            required
            type="text"
            name="nome"
            id="nomeCliente"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
          />
        </FormGroup>
        <FormGroup className="campos">
          <Label for="emailCliente">E-mail</Label>
          <Input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="emailCliente"
            placeholder="Digite o email"
          />
        </FormGroup>
        <FormGroup className="campo-telefone">
          <Label for="telefoneCliente">telefone</Label>
          <Input
            required
            type="tel"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            id="telefoneCliente"
          ></Input>
        </FormGroup>

        <div className="btn1">
          <Button
            type="submit"
            className="btnSubmit"
            color="primary"
            size="lg"
            block
          >
            Cadastrar
          </Button>
        </div>
        <div className="btn1">
          <Link className="link" to="/lista-cliente">
            <Button color="success" size="lg" block>
              Listar clientes
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default FormCliente;
