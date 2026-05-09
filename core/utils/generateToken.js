const jwt = require('jsonwebtoken');
const tenant = require('../../modules/tenants/tenant.model');

const generateToken = (user)=>{
    return jwt.sign(
        {auth_id:user.auth_id,tenant_id:user.tenant_id,role:user.role},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        },
    );
};

module.exports = generateToken;