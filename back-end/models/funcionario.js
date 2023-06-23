const mongoose = require("mongoose");

const funcionarioSchema = new mongoose.Schema({
  nome: String,
  cargo: String,
  telefone: String,
  bairro: String,
  rua: String,
  numero: String,
});

const Funcionario = mongoose.model("Funcionario", funcionarioSchema);

module.exports = Funcionario;
