const express = require('express');
const { Invite, GetInvite, InviteAccept, inviteUser, getInvite, acceptInvite } = require('./invite.controller');
const authMiddleware = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const { validateInvite, validateUserAccept } = require('../../core/utils/validators/invitation.validator');
const Roles = require('../../core/utils/roles');
const Permissions = require('../../core/utils/permissions');
const requirePermission = require('../../core/middleware/permissions.middleware');
const router = express.Router();

router.post('/',authMiddleware,requirePermission(Permissions.INVITE_CREATE),validate(validateInvite),inviteUser);

router.get('/:token',getInvite);

router.post('/:token/accept',validate(validateUserAccept),acceptInvite)

module.exports = router;