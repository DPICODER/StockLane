const { getExpiryStatus } = require("../../core/utils/invite-expiry");
const { createInvite, getInviteByToken, InvitationAccept } = require("./invite.service");

exports.inviteUser = async (req, res, next) => {
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


exports.getInvite = async (req, res, next) => {
    try {
        const token = req.params.token;

        //get invitation
        const inv_info = await getInviteByToken(token);
        if (!inv_info) {
            return res.status(404).json({
                message: "No Invitation found"
            })
        }

        //check expiry
        const inv_expiry = getExpiryStatus(inv_info.expires_at);
        if (inv_expiry) {
            return res.status(410).json({
                message: "Invitation has expired"
            })
        }

        //normalize the output to user
        const data_normalized = {
            id: inv_info.id,
            email: inv_info.email,
            role: inv_info.role,
            token: inv_info.token,
            status: inv_info.status,
            expires_at: inv_info.expires_at
        };
        return res.status(200).json({
            message: "Invitation fetch success",
            data: data_normalized
        })

    } catch (error) {
        next(error)
    }
}

exports.acceptInvite = async (req, res, next) => {
    try {
        const token = req.params.token;
        const data_normalized = {
            ...req.body,
            token:token
        }
        const inv_accept = await InvitationAccept(data_normalized);
        return res.status(201).json(inv_accept);
    } catch (error) {
        next(error);
    }
}