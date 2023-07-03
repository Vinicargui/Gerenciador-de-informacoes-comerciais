const Procedimento = require("../../models/procedimento");

const getProcedimentos = async (req, res) => {
  try {
    const procedimento = await Procedimento.find();
    res.json(procedimento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const nomeProcedimento = async (req, res) => {
  try {
    const procedimento = await Procedimento.find({}, { valor: 0 });
    res.json(procedimento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProcedimento = async (req, res) => {
  try {
    const procedimento = Procedimento.deleteOne({ _id: req.params.id });
    await procedimento;
    res.json({ message: "Procedimento deletado com sucesso" });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
};

const postProcedimento = async (req, res) => {
  const procedimento = new Procedimento({
    nome: req.body.nome,
    valor: req.body.valor,
  });

  try {
    const newProcedimento = await procedimento.save();
    res.status(201).json(newProcedimento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProcedimentos,
  nomeProcedimento,
  deleteProcedimento,
  postProcedimento,
};
