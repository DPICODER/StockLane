const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{

    try {
        // 1. Get Authorization Header 
        const authHeader = req.headers.authorization;

        // 2. Check if header exist 
        if(!authHeader){
            return res.status(401).json({
                message:"No token provided"
            })
        }
        
        // 3. Extract token
        const token = authHeader.split(" ")[1];

        // 4. verify + Decode token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        // 5. attach decoded data to request
        req.user = decoded;

        next();


    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }

}

module.exports = authMiddleware;