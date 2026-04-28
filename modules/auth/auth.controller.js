const { registerUser } = require("./auth.service");

exports.login = async (req, res) => {
    console.log("Login ROUTE TRIGGERD");
    res.send("HEHE")
}
exports.register = async (req, res , next) => {
    try {
        const result = await registerUser(req.body);
        return res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}