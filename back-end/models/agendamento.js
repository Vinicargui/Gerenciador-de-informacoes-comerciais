const mongoose = require("mongoose");

const agendamentoSchema = new mongoose.Schema({
  id: String,
  cliente: String,
  data: String,
  funcionario: String,
  procedimento: String,
  horario: String,
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

module.exports = Agendamento;
