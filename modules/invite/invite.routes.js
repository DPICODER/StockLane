const express = require('express');
const { Invite } = require('./invite.controller');
const authMiddleware = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const validateInvite = require('../../core/utils/validators/invitation.validator');
const router = express.Router();

router.post('/',authMiddleware,validate(validateInvite),Invite);


module.exports = router;