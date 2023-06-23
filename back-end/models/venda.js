const mongoose = require("mongoose");

const vendaSchema = new mongoose.Schema({
  formaPagamento: String,
  valor: Number,
  funcionario: String,
  cliente: String,
  procedimento: String,
  data: {
    type: Date,
    default: Date.now(),
  },
});

const Venda = mongoose.model("Venda", vendaSchema);

module.exports = Venda;
