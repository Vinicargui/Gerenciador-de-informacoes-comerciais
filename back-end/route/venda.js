const express = require("express");
const router = express.Router();
const Venda = require("../models/venda");
const {
  postVenda,
  getVendas,
  deleteVenda,
  getVendasData,
} = require("../controllers/venda");

router.get("/vendas", getVendas);

router.post("/venda", postVenda);

router.delete("/venda/:id", deleteVenda);

router.get("/venda/atual", getVendasData);

module.exports = router;
