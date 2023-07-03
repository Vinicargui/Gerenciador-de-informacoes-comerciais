const express = require("express");
const router = express.Router();
const Venda = require("../models/venda");
const { postVenda, getVendas, deleteVenda } = require("../controllers/venda");

router.get("/vendas", getVendas);

router.post("/venda", postVenda);

router.delete("/venda/:id", deleteVenda);

module.exports = router;
