const express = require('express');
const { Invite } = require('./invite.controller');
const authMiddleware = require('../../core/middleware/auth.middleware');
const router = express.Router();

router.post('/',authMiddleware,Invite);


module.exports = router;