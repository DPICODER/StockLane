const sequelize = require("../../core/db/database");
const ValidationError = require("../../core/utils/errors/ValidationError");
const generateToken = require("../../core/utils/generate-Jwt-Token");
const { createTenant } = require("../tenants/tenant.service");
const { createUser, getUser, getUserByUserName, getUserByAuthId } = require("../user/user.service");
const authModel = require("./auth.model")
const bcrypt = require('bcrypt');

exports.findAuthByEmail = (email) => {
    return authModel.findOne({ where: { email } });
};


exports.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

/**
 * Creates a authentication account for the new user
 * 
 * @param {String} email - user email
 * @param {String} password -hashed password
 * @param {UUID} tenant_id - tenant id
 * @param {String} role - role of the user
 * @param {any} options - like tarnsaction's
 * @returns {Promise<Object>} 
 */
exports.createAuthAccount = (email, password, tenant_id,role, options = {}) => {
    return authModel.create({
        email,
        password_hash: password,
        role: role,
        tenant_id,
        last_login: null
    }, options);
};

// Login Route for existing Tenant to login or invited user to login

exports.updateAuthLastLogin = (auth_id) => {
    return authModel.update({ last_login: new Date() },
        {
            where: { id:auth_id }
        }
    )
}

exports.loginUser = async ({ email, password }) => {
    const authData = await exports.findAuthByEmail(email);
    if (!authData) {
        throw new ValidationError({ auth: "Invalid Credentials Check again" })
    }
    const comparePasswords = await bcrypt.compare(password, authData.password_hash);
    if (!comparePasswords) {
        throw new ValidationError({ auth: "Invalid Credentials Check again" })
    }
    const userData = await getUserByAuthId(authData.id);

    // console.log("authDAata : ",authData);


    const tokenUser = {
        auth_id: authData.id,
        tenant_id: authData.tenant_id,
        user_id: userData.id,
        role: authData.role
    };
    //  DEBUG
    // console.log("Token USER DATA : ",tokenUser);
    // console.log("UserData :",userData);
    const token = generateToken(tokenUser);
    await exports.updateAuthLastLogin(authData.id);
    return { token, userData };
}


// Register Route for a new tenant Registration
exports.registerUser = async ({ email, password, company, plan, name, phone, avatar }) => {
    return sequelize.transaction(async (t) => {

        const emailExists = await exports.findAuthByEmail(email);

        if (emailExists) {
            throw new ValidationError({ email: "Email already Exists" })
        }

        const password_hash = await exports.hashPassword(password);
        const tenant = await createTenant(company, plan, { transaction: t });
        const authAccount = await exports.createAuthAccount(email, password_hash, tenant.id,"TENANT_ADMIN", { transaction: t })
        const user = await createUser(name, phone, avatar, tenant.id, authAccount.id, { transaction: t });

        return {
            success: true,
            message: `Tenant ${tenant.name} registered successfully`,
            data: {
                user: user.name,
                user_id: user.id,
                tenant_id: tenant.id,
                tenant: tenant.name,
            }
        }
    })
};