const user = require("./user.model");

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