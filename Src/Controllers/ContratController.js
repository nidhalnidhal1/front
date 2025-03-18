const { createContratSchema } = require('../Validations/ContratValidation'); // Ensure this import is correct

const {
  getContratServices,
  addContratServices,
  getContratByIdServices,
  updateContratService,
  deleteContratService
} = require("../Services/ContratServices");

const handleResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    message: message,
    data: data
  });
};

const getContrat = async (req, res) => {
  try {
    const data = await getContratServices();
    return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Contrat retrieved successfully" : "No Contrat found", data);
  } catch (error) {
    return handleResponse(res, 500, "An error occurred while retrieving Contrat", { error: error.message });
  }
};

const addContrat = async (req, res) => {
  try {
    // Validate the incoming request body
    const { error } = createContratSchema.validate(req.body);
    if (error) {
      return handleResponse(res, 400, "Validation error", error.details);
    }

    // Ensure Numero_contrat is not included in the request body
    if (req.body.Numero_contrat) {
      delete req.body.Numero_contrat; // Remove it if it exists
    }

    const data = await addContratServices(req.body);
    return handleResponse(res, 201, "Contrat added successfully", data);
  } catch (error) {
    console.error("Error adding contrat:", error);
    return handleResponse(res, 500, "An error occurred while adding Contrat", { error: error.message });
  }
};

const getContratById = async (req, res) => {
  try {
    const { ID_contrat } = req.params;
    const data = await getContratByIdServices(ID_contrat);
    if (!data) {
      return handleResponse(res, 404, "Contrat not found. Please check the number.");
    }
    return handleResponse(res, 200, "Contrat retrieved successfully", data);
  } catch (error) {
    return handleResponse(res, 500, "Error retrieving contract", { error: error.message });
  }
};

const updateContrat = async (req, res) => {
  try {
    const { ID_contrat } = req.params;
    const updatedContrat = await updateContratService(ID_contrat, req.body);
    return handleResponse(res, updatedContrat ? 200 : 404, updatedContrat ? "Contrat updated successfully" : "Contrat not found", updatedContrat);
  } catch (error) {
    return handleResponse(res, 500, "An error occurred while updating Contrat", { error: error.message });
  }
};

const deleteContrat = async (req, res) => {
  try {
    const { ID_contrat } = req.params;
    const contrat = await getContratByIdServices(ID_contrat);
    if (!contrat) {
      return handleResponse(res, 404, "Contrat not found");
    }

    const result = await deleteContratService(ID_contrat);
    if (result === 0) {
      return handleResponse(res, 404, "Contrat not found or already deleted");
    }

    return handleResponse(res, 200, "Contrat deleted successfully", contrat);
  } catch (error) {
    console.error("Error deleting contrat:", error);
    return handleResponse(res, 500, "An error occurred while deleting Contrat", { error: error.message });
  }
};

module.exports = {
  getContrat,
  addContrat,
  getContratById,
  updateContrat,
  deleteContrat,
};