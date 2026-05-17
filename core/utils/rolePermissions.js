const Permissions = require("./permissions");
const { TENANT_ADMIN, STAFF } = require("./roles");

const rolePermissions = {
    [TENANT_ADMIN]:[
        Permissions.INVITE_CREATE,
        Permissions.INVITE_VIEW,
        Permissions.MEMBER_UPDATE,
        Permissions.MEMBER_DELETE,
        Permissions.TENANT_UPDATE
    ],

    [STAFF]:[
        Permissions.INVITE_VIEW
    ]
}


module.exports = rolePermissions;