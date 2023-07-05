const Venda = require("../../models/venda");
require("dotenv").config();
const nodemailer = require("nodemailer");

const getVendas = async (req, res) => {
  try {
    const vendas = await Venda.find();
    res.status(200).json(vendas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao obter vendas" });
  }
};

const transporte = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USEMAIL,
    pass: process.env.PASSWORDEMAIL,
  },
});

const postVenda = async (req, res) => {
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
};

const deleteVenda = async (req, res) => {
  const id = req.params.id;

  try {
    await Venda.deleteOne({ _id: id });
    res.json({ message: "Venda deletado com sucesso" });
  } catch (error) {
    console.log(error);
  }
};

const getVendasData = async (req, res) => {
  const dataAtual = Date.now();

  try {
    const vendaAtual = await Venda.find({ data: dataAtual });
    res.status(200).json(vendaAtual);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter vendas atuais" });
  }
};

module.exports = { postVenda, getVendas, deleteVenda, getVendasData };
