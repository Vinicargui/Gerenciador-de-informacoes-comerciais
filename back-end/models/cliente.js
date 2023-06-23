const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  email: String,
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
