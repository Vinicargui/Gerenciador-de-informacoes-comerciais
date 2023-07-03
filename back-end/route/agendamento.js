const router = require("express").Router();

const {
  getAll,
  getId,
  deleteId,
  postAgenda,
  patchAgenda,
} = require("../controllers/Agenda");

router.get("/agenda", getAll);

router.get("/agenda/:id", getId);

router.delete("/agenda/:id", deleteId);

router.post("/agenda", postAgenda);

router.patch("/agenda/:id", patchAgenda);

module.exports = router;
