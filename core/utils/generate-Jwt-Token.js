const jwt = require('jsonwebtoken');
const tenant = require('../../modules/tenants/tenant.model');

const generateToken = (tokenData)=>{
    return jwt.sign(
        {auth_id:tokenData.auth_id,tenant_id:tokenData.tenant_id,user_id:tokenData.user_id,role:tokenData.role},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        },
    );
};

module.exports = generateToken;