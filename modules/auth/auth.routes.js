const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../core/middleware/validate.middleware');
const { loginSchema, registerSchema } = require('../../core/utils/validators/auth.validator');
const authMiddleware = require('../../core/middleware/auth.middleware');


router.post('/login',validate(loginSchema),authController.login);
router.post('/register',validate(registerSchema),authController.register);

router.get('/req/data',authMiddleware,(req,res)=>{
    const req_data = req.user;
    return res.status(200).json({
        message:"Req data",
        data : req_data
    })
})

module.exports = router;