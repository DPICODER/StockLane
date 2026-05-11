const authMiddleware = require("../../core/middleware/auth.middleware");
const { createInvite } = require("./invite.service");

exports.Invite = async (req, res, next) => {
    try {
        const { email, role, expiryDuration } = req.body;
        const result = await createInvite(email, role, expiryDuration, req.user);
        return res.status(201).json({
            message: "Invitation created successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }

};