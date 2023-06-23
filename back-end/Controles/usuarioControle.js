const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(422).json({ message: `email: ${email} ja cadastrado` });
    }

    // const senhaCript = await createPasswordHash(password);

    // const de = await bcrypt.hash(password, 8);
    const newUsuario = await Usuario.create({
      email,
      password,
    });
    return res.status(201).json(newUsuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno no servidorr" });
  }
});

module.exports = router;
