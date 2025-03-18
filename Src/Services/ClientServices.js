const Client = require("../Model/ClientModel");

const getClientServices = async () => {
    try {
        return await Client.findAll();
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
};

const addClientServices = async (body) => {
    try {
        const exists = await Client.findOne({ where: { cin_client: body.cin_client } });
        if (exists) {
            throw new Error("Le client avec ce numéro de CIN existe déjà.");
        }
        console.log("Body received in addClientServices:", body);
        return await Client.create(body);
    } catch (error) {
        console.error("Error adding client:", error);
        throw error;
    }
};


const getClientByIdServices = async (id_client) => {
    try {
        return await Client.findByPk(id_client);
    } catch (error) {
        console.error("Error fetching client by ID:", error);
        throw error;
    }
};
const getClientByCINService = async (cin_client) => {
    try {
        return await Client.findOne({ where: { cin_client } });
    } catch (error) {
        console.error("Error fetching client by CIN:", error);
        throw error;
    }
};

const updateClientService = async (id_client, body) => {
    try {
        const client = await Client.findByPk(id_client);
        if (!client) {
            return null;
        }
        await client.update(body);
        return client;
    } catch (error) {
        console.error("Error updating client:", error);
        throw error;
    }
};


const deleteClientService = async (id_client) => {
    try {
        const deleted = await Client.destroy({ where: { id_client } });
        return deleted > 0;
    } catch (error) {
        console.error("Error deleting client:", error);
        throw error;
    }
};


module.exports = {
    getClientServices,
    addClientServices,
    getClientByIdServices,
    updateClientService,
    deleteClientService,
    getClientByCINService,
};