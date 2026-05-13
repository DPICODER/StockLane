const joi = require('joi');


const validateInvite = joi.object({
    email:joi.string().email().required(),
    role:joi.string().valid("TENANT_ADMIN","STAFF"),
    expiryDuration:joi.number().required()
})


const validateUserAccept = joi.object({
    name:joi.string().min(2).max(80).required(),
    password:joi.string().min(6).required(),
    phone:joi.string().required()
})

module.exports = {validateInvite,validateUserAccept};