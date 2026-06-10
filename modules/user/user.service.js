const authModel = require("../auth/auth.model");
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
exports.createUser = (name, phone, avatar, tenant_id, auth_id, options = {}) => {
    return user.create({
        name, phone, avatar: avatar || "", tenant_id, auth_id
    }, options)
}

exports.getUserByAuthId = (auth_id) => {
    return user.findOne({
        where: {
            auth_id
        }, attributes: ["id", "name", "avatar"], raw: true
    })
}

exports.getUserByUserId = (id)=>{
    return user.findOne({
        where:{
            id
        }
    })
}

exports.getAllTenantUsers = (tenant_id) => {
    return user.findAll({
        where: {
            tenant_id
        }
    })
}

exports.userInfoUpdate = (info,id) =>{
    return user.update(info,{where:{
        id
    }})
}

exports.deactivateMember = async (id) => {
    const userExists = await exports.getUserByUserId(id);

    if (!userExists) {
        return {
            success: false,
            code: "USER_NOT_FOUND",
            message: "User not found"
        };
    }

    const auth_info = await authModel.findOne({
        where: { id: userExists.auth_id },
        raw: true,
        attributes: ["status"]
    });

    if (!auth_info) {
        return {
            success: false,
            code: "AUTH_RECORD_NOT_FOUND",
            message: "Auth record not found"
        };
    }

    if (auth_info.status === "inactive") {
        return {
            success: false,
            code: "ALREADY_DEACTIVATED",
            message: "User already deactivated"
        };
    }

    const updateStatus = await authModel.update(
        { status: "inactive" },
        { where: { id: userExists.auth_id } }
    );

    if (updateStatus[0] === 0) {
        return {
            success: false,
            code: "UPDATE_FAILED",
            message: "Update failed"
        };
    }

    return {
        success: true,
        code: "USER_DEACTIVATED",
        message: "User deactivated successfully"
    };
};