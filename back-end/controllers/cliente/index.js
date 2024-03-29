const Cliente = require("../../models/cliente");

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCliente = async (req, res) => {
  const id = req.params.id;

  try {
    await Cliente.deleteOne({ _id: id });
    res.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    console.log(error);
  }
};

const getIdCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (cliente == null) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postCliente = async (req, res) => {
  const { nome, telefone, email } = req.body;

  const usuarioEmail = await Cliente.findOne({ email });
  if (usuarioEmail) {
    return res.status(422).json("email ja cadastrado");
  }

  const cliente = {
    nome,
    telefone,
    email,
  };

  try {
    const novoCliente = Cliente(cliente);
    await novoCliente.save();
    res.status(201).json("cadastrado com sucesso!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const putCliente = async (req, res) => {
  try {
    const atualizarCliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!atualizarCliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    res.json(atualizarCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getClientes,
  deleteCliente,
  getIdCliente,
  postCliente,
  putCliente,
};
