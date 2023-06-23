const router = require("express").Router();
require("dotenv").config();
const { Router } = require("express");
const Agendamento = require("../models/agendamento");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const bot = new Telegraf(process.env.CONEXAO);

router.get("/agenda", async (req, res) => {
  try {
    const agendamento = await Agendamento.find();
    res.json(agendamento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/agenda/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const agendamento = await Agendamento.findById(id);
    res.json(agendamento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/agenda/:id", async (req, res) => {
  try {
    const agendamento = Agendamento.deleteOne({ _id: req.params.id });
    await agendamento;
    res.json({ message: "agendamento deletado com sucesso" });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

router.post("/agenda", async (req, res) => {
  const { cliente, data, funcionario, procedimento, horario } = req.body;

  const agendamento = {
    cliente,
    data,
    funcionario,
    procedimento,
    horario,
  };

  try {
    const novoAgendamento = new Agendamento(agendamento);
    await novoAgendamento.save();
    res.status(201).json({ message: "Cadastrado com Sucesso!" });

    bot.telegram.sendMessage(
      process.env.TELENUMERO,
      ` Agendamento realizado com sucesso! 
     Cliente: ${cliente}
     Data: ${data}
     Horario: ${horario}
     funcionária:${funcionario}
     `
    );
  } catch (error) {
    console.log(error);
  }
});

router.patch("/agenda/:id", async (req, res) => {
  const id = req.params.id;
  const { cliente, data, funcionario, procedimento, horario } = req.body;

  const agendamento = {
    cliente,
    data,
    funcionario,
    procedimento,
    horario,
  };

  try {
    await Agendamento.updateOne({ _id: id }, agendamento);
    res.json({ mensagem: "Agendamento atualizado com sucesso!" });
  } catch (error) {
    res.status(400).json({ errado: error });
  }
});

module.exports = router;
