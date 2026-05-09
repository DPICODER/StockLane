const joi = require('joi');

const registerSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    company:joi.string().min(2).required(),
    plan:joi.string().valid("free","pro","max").optional(),
    name:joi.string().min(2).max(55),
    phone:joi.string().min(10).max(10),
})

const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
})


module.exports = {registerSchema,loginSchema}