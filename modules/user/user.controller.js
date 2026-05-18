const { getAllTenantUsers, userInfoUpdate, userDelete } = require("./user.service");

exports.listAllTenantUsers = async (req, res, next) => {
    try {
        const { tenant_id } = req.body
        const userData = await getAllTenantUsers(tenant_id);
        return res.status(200).json({
            success: true,
            data: userData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUserInfoById = async (req,res,next) =>{
    try {
        const user_id = req.params.id;
        const data = req.body;
        
        const update_user = await userInfoUpdate(data,user_id);
        return res.status(200).json({
            success:true,
            message:"User info updated successfully"
        })
    } catch (error) {
        next(error);
    }
}

exports.deleteUserById = async(req,res,next)=>{
    try {
        const user_id = req.params.id;
        const deleted_user = await userDelete(user_id);
        return res.status(200).json({
            success:true,
            message:`User ${user_id} deleted successfully`
        })
    } catch (error) {
        next(error)
    }
}