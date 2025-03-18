const joi = require("joi");

const createContratSchema = joi.object({
    Date_debut: joi.date().required(),
    Heure_debut: joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required(),
    Date_retour: joi.date().greater(joi.ref('Date_debut')).required(),
    Heure_retour: joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required(),
    Duree_location: joi.number().integer().positive().required(),
    Prolongation: joi.date().allow(null).optional(),
    Numero_contrat: joi.string().strip(), // Make Numero_contrat optional and strip it
    num_immatriculation: joi.string().required(),
    cin_client: joi.string().required(),
    Prix_total: joi.number().precision(2).required(),
    mode_reglement_garantie: joi.string().allow(null, '').optional(),
    montant: joi.number().precision(2).allow(null).optional(),
    echeance: joi.date().allow(null).optional(),
    numero_piece: joi.string().allow(null, '').optional(),
    banque: joi.string().allow(null, '').optional(),
    frais_retour: joi.number().precision(2).allow(null).optional(),
    frais_carburant: joi.number().precision(2).allow(null).optional(),
    frais_chauffeur: joi.number().precision(2).allow(null).optional(),
}).unknown(true);

const findIdContratSchema = joi.object({
    ID_contrat: joi.number().integer().required()
});

module.exports = {
    createContratSchema,
    findIdContratSchema
};