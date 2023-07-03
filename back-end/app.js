const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const vendaControle = require("./route/venda");
const agendamentoControle = require("./route/agendamento");
const clienteControle = require("./route/cliente");
const procedimentoControle = require("./route/procedimento");
const funcionarioControle = require("./route/funcionario");
const usuarioControle = require("./route/usuarioControle");

app.use(cors());
app.use(express.json());

const usuario = process.env.USUARIO;
const password = process.env.PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${usuario}:${password}@cluster0.2t8loaa.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Conexão com o banco de dados estabelecida."))
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  });

app.listen(3002, function () {
  console.log("servidor conectado!");
});

app.use("/", vendaControle);
app.use("/", agendamentoControle);
app.use("/cliente", clienteControle);
app.use("/", procedimentoControle);
app.use("/", funcionarioControle);
app.use("/usuario", usuarioControle);
