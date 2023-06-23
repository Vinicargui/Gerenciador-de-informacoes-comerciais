const mongoose = require("mongoose");

const procedimentoSchema = new mongoose.Schema({
  nome: String,
  valor: Number,
});

const Procedimento = mongoose.model("Procedimento", procedimentoSchema);

module.exports = Procedimento;
