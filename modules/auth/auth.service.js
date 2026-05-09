const sequelize = require("../../core/db/database");
const ValidationError = require("../../core/utils/errors.js/ValidationError");
const generateToken = require("../../core/utils/generateToken");
const { createTenant, checkTenantExists } = require("../tenants/tenant.service");
const { createUser, getUser, getUserByUserName, getUserByAuthId } = require("../user/user.service");
const authModel = require("./auth.model")
const bcrypt = require('bcrypt');

exports.findAuthByEmail = (email)=>{
    return authModel.findOne({where:{email}});
};


exports.hashPassword = (password)=>{
    return bcrypt.hash(password,10);
};

exports.createAuthAccount = (email,password,tenant_id,options ={})=>{
    return authModel.create({
        email,
        password_hash:password,
        role:"TENANT_ADMIN",
        tenant_id,
        last_login:new Date()
    },options);
};

// Login Route for existing Tenant to login or invited user to login


exports.loginUser = async({email,password})=>{
    const authData = await exports.findAuthByEmail(email);
    if(!authData){
        throw new ValidationError({auth:"Invaild Credientials Check again"})
    }
    const comparePasswords = await bcrypt.compare(password,authData.password_hash);
    if(!comparePasswords){
        throw new ValidationError({auth:"Invaild Credientials Check again"})
    }
    const userData = await getUserByAuthId(authData.id);

    console.log("authDAata : ",authData);
    
    
    const tokenUser = {
        auth_id : authData.id,
        tenant_id : authData.tenant_id,
        role : authData.role
    };
    //  DEBUG
    // console.log("Token USER DATA : ",tokenUser);
    // console.log("UserData :",userData);
    const token = generateToken(tokenUser);
    
    return {token,userData};
}


// Register Route for a new tenant Registration
exports.registerUser = async ({email,password,company,plan,name,phone,avatar})=>{
    return sequelize.transaction(async(t)=>{

        const emailExists = await exports.findAuthByEmail(email);

        if(emailExists){
            throw new ValidationError({email:"Email already Exists"})
        }

        const password_hash = await exports.hashPassword(password);
        const tenant = await createTenant(company, plan,{transaction:t});
        const authAccount = await exports.createAuthAccount(email, password_hash, tenant.id,{transaction:t})
        const user = await createUser(name,phone,avatar,tenant.id,authAccount.id,{transaction:t});

        return {
            success:true,
            message: `Tenant ${tenant.name} registered sucessfully`,
            data:{
                user : user.name,
                user_id: user.id,
                tenant_id: tenant.id,
                tenant : tenant.name,
            }
        }
    })
};