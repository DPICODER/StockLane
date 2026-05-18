const { getActiveTenantUsers } = require("./tenant.service");

exports.listTenants =async (req,res,next)=>{
try {
    const users = await getActiveTenantUsers();

    return res.status(200).json({
        success:true,
        data:users
    });
} catch (error) {
    next(error)
}
}