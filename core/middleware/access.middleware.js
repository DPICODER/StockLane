export function requireAccess(allowedRoles){
    return (req,res,next) => {
        if(!req.user){
            return res.status(401).json({
                "success":false,
                "message":'Authenticate to access'
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                "success":false,
                "message":"Forbidden"
            });
        }
        next();
    }
}