const express = require("express");
const router = express.Router();
const Procedimento = require("../models/procedimento");

router.get("/procedimento", async (req, res) => {
  try {
    const procedimento = await Procedimento.find();
    res.json(procedimento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/nomeProcedimento", async (req, res) => {
  try {
    const procedimento = await Procedimento.find({}, { valor: 0 });
    res.json(procedimento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/procedimento/:id", async (req, res) => {
  try {
    const procedimento = Procedimento.deleteOne({ _id: req.params.id });
    await procedimento;
    res.json({ message: "Procedimento deletado com sucesso" });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

router.post("/procedimento", async (req, res) => {
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
});

module.exports = router;
