const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../core/middleware/validate.middleware');
const { loginSchema, registerSchema } = require('../../core/utils/validators/auth.validator');


router.post('/login',validate(loginSchema),authController.login);
router.post('/register',validate(registerSchema),authController.register);

module.exports = router;