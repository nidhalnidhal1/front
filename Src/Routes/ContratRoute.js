const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdContratSchema, createContratSchema } = require("../Validations/ContratValidation");
const router = express.Router();
const {
  getContrat,
  addContrat,
  getContratById,
  updateContrat,
  deleteContrat
} = require("../Controllers/ContratController");

// Define routes
router.get("/", getContrat);
router.post("/", validateBody(createContratSchema), addContrat);
router.get("/:ID_contrat", validateParams(findIdContratSchema), getContratById);
router.put("/:ID_contrat", validateParams(findIdContratSchema), validateBody(createContratSchema), updateContrat);
router.delete("/:ID_contrat", validateParams(findIdContratSchema), deleteContrat);

module.exports = router;