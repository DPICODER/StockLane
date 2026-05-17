const express = require('express');
const { Invite, GetInvite, InviteAccept, inviteUser, getInvite, acceptInvite } = require('./invite.controller');
const authMiddleware = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const { validateInvite, validateUserAccept } = require('../../core/utils/validators/invitation.validator');
const { requireAccess } = require('../../core/middleware/access.middleware');
const Roles = require('../../core/utils/roles');
const router = express.Router();

router.post('/',authMiddleware,requireAccess([Roles.TENANT_ADMIN]),validate(validateInvite),inviteUser);

router.get('/:token',getInvite);

router.post('/:token/accept',validate(validateUserAccept),acceptInvite)

module.exports = router;