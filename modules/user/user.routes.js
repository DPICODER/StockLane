const express = require('express');
const { listAllTenantUsers, updateUserInfoById, deleteUserById } = require('./user.controller');
const authMiddleware = require('../../core/middleware/auth.middleware');
const requirePermission = require('../../core/middleware/permissions.middleware');
const Permissions = require('../../core/utils/permissions');
const router = express.Router();

router.use(authMiddleware);
router.get('/',requirePermission(Permissions.MEMBER_VIEW),listAllTenantUsers);

router.patch('/:id',requirePermission(Permissions.MEMBER_UPDATE),updateUserInfoById);

router.delete('/:id',requirePermission(Permissions.MEMBER_DEACTIVATE),deleteUserById);

module.exports = router;