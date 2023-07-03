const express = require("express");
const router = express.Router();

const {
  getClientes,
  deleteCliente,
  getIdCliente,
  postCliente,
  putCliente,
} = require("../controllers/cliente");

router.get("/", getClientes);

router.delete("/:id", deleteCliente);

router.get("/:id", getIdCliente);

router.post("/", postCliente);

router.put("/:id", putCliente);

module.exports = router;
