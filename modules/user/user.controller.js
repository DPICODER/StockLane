const { getAllTenantUsers, userInfoUpdate, deactivateMember } = require("./user.service");

exports.listAllTenantUsers = async (req, res, next) => {
    try {
        const { tenant_id } = req.user
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

exports.deactivateUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const result = await deactivateMember(user_id);

        switch (result.code) {
            case "USER_NOT_FOUND":
                return res.status(404).json(result);

            case "AUTH_RECORD_NOT_FOUND":
                return res.status(404).json(result);

            case "ALREADY_DEACTIVATED":
                return res.status(409).json(result);

            case "UPDATE_FAILED":
                return res.status(500).json(result);

            case "USER_DEACTIVATED":
                return res.status(200).json(result);

            default:
                return res.status(500).json({
                    success: false,
                    code: "UNKNOWN_ERROR",
                    message: "Unknown error"
                });
        }
    } catch (error) {
        next(error);
    }
};