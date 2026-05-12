const { registerUser, loginUser } = require("./auth.service");

exports.login = async (req, res,next) => {
    try{
        const result = await loginUser(req.body);
        return res.status(200).json(result);
    }catch(error){
        next(error)
    }
}
exports.register = async (req, res , next) => {
    try {
        const result = await registerUser(req.body);
        return res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}