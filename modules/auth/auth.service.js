const sequelize = require("../../core/db/database");
const ValidationError = require("../../core/utils/errors.js/ValidationError");
const { createTenant } = require("../tenants/tenant.service");
const authModel = require("./auth.model")
const bcrypt = require('bcrypt');

exports.checkEmailExists = (email)=>{
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

exports.registerUser = async ({email,password,company,plan})=>{
    return sequelize.transaction(async(t)=>{

        const emailExists = await exports.checkEmailExists(email);
        if(emailExists){
            throw new ValidationError({email:"Email already Exists"})
        }

        const password_hash = await exports.hashPassword(password);
        const tenant = await createTenant(company, plan,{transaction:t});
        const user = await exports.createAuthAccount(email, password_hash, tenant.id,{transaction:t})
        
        return {
            success:true,
            message: "Tenant registered sucessfully",
            data:{
                user_id: user.id,
                tenant_id: tenant.id
            }
        }
    })
};