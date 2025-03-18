const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdClientSchema, createClientSchema } = require("../Validations/ClientValidation");
const router = express.Router();
const {
    getClient,
    addClient,
    getClientById,
    updateClient,
    deleteClient,
    getClientByCIN 
} = require("../Controllers/clientController");

// Routes
router.get("/", getClient);
router.get("/cin_client", getClientByCIN); 
router.post("/", validateBody(createClientSchema), addClient);
router.get("/:id_client", validateParams(findIdClientSchema), getClientById);
router.put("/:id_client", validateParams(findIdClientSchema), validateBody(createClientSchema), updateClient);
router.delete("/:id_client", validateParams(findIdClientSchema), deleteClient);

module.exports = router;