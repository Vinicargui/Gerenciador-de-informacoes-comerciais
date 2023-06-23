const express = require("express");
require("dotenv").config();
const router = express.Router();
const nodemailer = require("nodemailer");

const transporte = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USEMAIL,
    pass: process.env.PASSWORDEMAIL,
  },
});

const Venda = require("../models/venda");

router.get("/vendas", async (req, res) => {
  try {
    const vendas = await Venda.find();
    res.status(200).json(vendas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao obter vendas" });
  }
});

router.post("/venda", async (req, res) => {
  const { cliente, funcionario, data, procedimento, formaPagamento, valor } =
    req.body;

  const vendas = {
    cliente,
    funcionario,
    data,
    procedimento,
    formaPagamento,
    valor,
  };

  try {
    const newVendas = new Venda(vendas);
    await newVendas.save();
    res.status(201).json({ message: "Cadastrado com Sucesso!" });

    try {
      const resul = await transporte.sendMail({
        from: "Sistema gerenciador de finanças comerciais <vinicius.cardoso8888@outlook.com>",
        to: "thais.braga.8@outlook.com",
        subject: "Pagamento identificado",
        html: `<p>Pagamento realizado por ${cliente} </p>
               <p>Valor: ${valor} </p>
               <p>Forma de pagamento: ${formaPagamento} </p>
               <p>Procedimento: ${procedimento} </p>
               <p>Atendida ${funcionario}</p>
        `,
        text: "Pagamento 20,00",
      });

      res.status(201).json({ resul });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/venda/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Venda.deleteOne({ _id: id });
    res.json({ message: "Venda deletado com sucesso" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
