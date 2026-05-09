const user = require("./user.model");

exports.createUser = (name,phone,avatar,tenant_id,auth_id)=>{
    return user.create({
        name,phone,avatar:avatar||"",tenant_id,auth_id
    })
}


exports.getUser = (tenant_id) =>{
    return user.findOne({where:{
        tenant_id:tenant_id
    }})
}

exports.getUserByUserName = (userName) =>{
    return user.findOne({where:{
        name:userName
    }})
}

exports.getUserByAuthId = (auth_id) =>{
    return user.findOne({where:{
        auth_id
    },attributes:["id","name","avatar"],raw:true})
}