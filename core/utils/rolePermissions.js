const Permissions = require("./permissions");
const { TENANT_ADMIN, STAFF } = require("./roles");

const rolePermissions = {
    SUPER_ADMIN:[
        Permissions.TENANT_VIEW
    ],
    [TENANT_ADMIN]:[
        Permissions.INVITE_CREATE,
        Permissions.INVITE_VIEW,
        Permissions.MEMBER_UPDATE,
        Permissions.MEMBER_VIEW,
        Permissions.MEMBER_DEACTIVATE,
        Permissions.TENANT_UPDATE
    ],

    [STAFF]:[
        Permissions.INVITE_VIEW
    ]
}

module.exports = rolePermissions;