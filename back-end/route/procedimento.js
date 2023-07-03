const express = require("express");
const router = express.Router();
const Procedimento = require("../models/procedimento");

const {
  getProcedimentos,
  nomeProcedimento,
  deleteProcedimento,
  postProcedimento,
} = require("../controllers/procedimento");

router.get("/procedimento", getProcedimentos);

router.get("/nomeProcedimento", nomeProcedimento);

router.delete("/procedimento/:id", deleteProcedimento);

router.post("/procedimento", postProcedimento);

module.exports = router;
