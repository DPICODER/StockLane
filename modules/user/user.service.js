const user = require("./user.model");

/**
 * Creates a user account 
 * 
 * @param {String} name user name 
 * @param {String} phone user contact number
 * @param {Image} avatar user image optional
 * @param {UUID} tenant_id 
 * @param {UUID} auth_id 
 * @param {any} options like transactions
 * @returns {Promise<object>}
 */
exports.createUser = (name,phone,avatar,tenant_id,auth_id,options={})=>{
    return user.create({
        name,phone,avatar:avatar||"",tenant_id,auth_id
    },options)
}


exports.getUser = (tenant_id) =>{
    return user.findOne({where:{
        tenant_id:tenant_id
    }})
}

exports.getUserByAuthId = (auth_id) =>{
    return user.findOne({where:{
        auth_id
    },attributes:["id","name","avatar"],raw:true})
}