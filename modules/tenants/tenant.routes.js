const express = require('express');
const { listTenants } = require('./tenant.controller');
const authMiddleware = require('../../core/middleware/auth.middleware');
const requirePermission = require('../../core/middleware/permissions.middleware');
const Permissions = require('../../core/utils/permissions');
const router = express.Router();
router.use(authMiddleware);
router.get('/',requirePermission(Permissions.TENANT_VIEW),listTenants);



module.exports = router;