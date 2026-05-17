const rolePermissions =
   require("../utils/rolePermissions");


const requirePermission = (allowedPermissions)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                "success":false,
                "message":'Authenticate to access'
            })
        }
        
        const roleAccess = rolePermissions[req.user.role];
        if(!roleAccess.includes(allowedPermissions)){
            return res.status(403).json({
                "success":false,
                "message":"Forbidden"
            });
        }
        next();
    }
}

module.exports = requirePermission;