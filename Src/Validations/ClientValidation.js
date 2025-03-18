const joi = require("joi");

const createClientSchema = joi.object({
    id_client: joi.number().optional(), 
    nom_fr: joi.string().required(), 
    nom_ar: joi.string().required(),
    prenom_fr: joi.string().required(), 
    prenom_ar: joi.string().required(),
    cin_client: joi.string().required(),
    date_cin: joi.date().required(),
    date_naiss: joi.date().required(),
    adresse_fr: joi.string().required(), 
    adresse_ar: joi.string().required(),
    num_tel: joi.string().required(), 
    Numero_Permis: joi.string().required(), 
    date_permis: joi.date().required(),
    profession_fr: joi.string().optional(), 
    profession_ar: joi.string().optional(), 
    nationalite_origine: joi.string().required() 
}).unknown(true);

const findIdClientSchema = joi.object({
    id_client: joi.string().required() 
});

exports.findIdClientSchema = findIdClientSchema;
exports.createClientSchema = createClientSchema;