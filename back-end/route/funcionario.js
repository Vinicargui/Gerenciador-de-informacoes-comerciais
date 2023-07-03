const express = require("express");
const router = express.Router();

const {
  getFuncionarios,
  nomeFunconarios,
  funcionarioId,
  postFuncionario,
  putFuncionario,
  deleteFuncionario,
} = require("../controllers/funcionario");

router.get("/funcionario", getFuncionarios);

router.get("/nomefuncionario", nomeFunconarios);

router.get("/funcionario/:id", funcionarioId);

router.post("/funcionario", postFuncionario);

router.put("/funcionario/:id", putFuncionario);

router.delete("/funcionario/:id", deleteFuncionario);

module.exports = router;
