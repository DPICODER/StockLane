const joi = require('joi');


const validateInvite = joi.object({
    email:joi.string().email().required(),
    role:joi.string().valid("TENANT_ADMIN","STAFF"),
    expiryDuration:joi.number().required()
})


module.exports = validateInvite;