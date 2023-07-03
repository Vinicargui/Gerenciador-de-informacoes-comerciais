const Funcionario = require("../../models/funcionario");

const getFuncionarios = async (req, res) => {
  try {
    const funcionario = await Funcionario.find();
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const nomeFunconarios = async (req, res) => {
  try {
    const funcionario = await Funcionario.find(
      {},
      { bairro: 0, cargo: 0, telefone: 0, numero: 0, rua: 0 }
    );
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const funcionarioId = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (funcionario == null) {
      return res.status(404).json({ message: "Funcionario não encontrado" });
    }
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postFuncionario = async (req, res) => {
  const funcionario = new Funcionario({
    nome: req.body.nome,
    cargo: req.body.cargo,
    telefone: req.body.telefone,
    bairro: req.body.bairro,
    rua: req.body.rua,
    numero: req.body.numero,
  });

  try {
    const newFuncionario = await funcionario.save();
    res.status(201).json(newFuncionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const putFuncionario = async (req, res) => {
  try {
    const atualizarFuncionario = await Funcionario.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!atualizarFuncionario) {
      return res.status(404).json({ message: "Funcionario não encontrado" });
    }

    res.json(atualizarFuncionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFuncionario = async (req, res) => {
  const id = req.params.id;
  try {
    await Funcionario.deleteOne({ _id: id });
    res.json({ message: "funcionario deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getFuncionarios,
  nomeFunconarios,
  funcionarioId,
  postFuncionario,
  putFuncionario,
  deleteFuncionario,
};
