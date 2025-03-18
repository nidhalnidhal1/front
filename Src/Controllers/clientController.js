const {
    getClientServices,
    addClientServices,
    getClientByIdServices,
    updateClientService,
    deleteClientService,
    getClientByCINService
} = require("../Services/ClientServices");

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ statusCode, message, data });
};

const getClient = async (req, res) => {
    try {
        const data = await getClientServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Clients retrieved successfully" : "No clients found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving clients", { error: error.message });
    }
};
const getClientByCIN = async (req, res) => {
    const { cin_client } = req.query; // Get the cin_client from the query parameters
    try {
        const client = await getClientByCINService(cin_client);
        if (client) {
            return handleResponse(res, 200, 'Client retrieved successfully', client);
        } else {
            return handleResponse(res, 404, 'Client not found');
        }
    } catch (error) {
        console.error("Error fetching client by CIN:", error);
        return handleResponse(res, 500, 'An error occurred while retrieving client', { error: error.message });
    }
};
const addClient = async (req, res) => {
    console.log("Received body:", req.body); 
    try {
        const data = await addClientServices(req.body);
        return handleResponse(res, 201, "Client added successfully", data);
    } catch (error) {
        return handleResponse(res, 400, error.message, null);
    }
};


const getClientById = async (req, res) => {
    try {
        const data = await getClientByIdServices(req.params.id_client);
        return handleResponse(res, data ? 200 : 404, data ? "Client retrieved successfully" : "Client not found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving client", { error: error.message });
    }
};


const updateClient = async (req, res) => {
    try {
        const { id_client } = req.params;
        const updatedClient = await updateClientService(id_client, req.body);
        return handleResponse(res, updatedClient ? 200 : 404, updatedClient ? "Client updated successfully" : "Client not found", updatedClient);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating client", { error: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { id_client } = req.params;
        const client = await getClientByIdServices(id_client);
        if (!client) {
            return handleResponse(res, 404, "Client not found");
        }
        await deleteClientService(id_client);
        return handleResponse(res, 200, "Client deleted successfully");
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting client", { error: error.message });
    }
};

module.exports = {
    getClient,
    addClient,
    getClientById,
    updateClient,
    deleteClient,
    getClientByCIN
};