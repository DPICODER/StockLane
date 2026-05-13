const sequelize = require("../../core/db/database");
const NotFoundError = require("../../core/utils/errors/NotFoundError");
const ValidationError = require("../../core/utils/errors/ValidationError");
const { generateInviteToken } = require("../../core/utils/generate-Invite-Token");
const { getExpiryStatus, getInviteExpirationDate } = require("../../core/utils/invite-expiry");
const { createAuthAccount, hashPassword } = require("../auth/auth.service");
const { createUser } = require("../user/user.service");
const invite = require("./invite.model");
/**
 * Creates a new pending invitation in the database.
 * 
 * @param {string} email - The email address of the person being invited.
 * @param {string} role - The permission level assigned to the invitee.
 * @param {number} expiryDuration - Number of days until the invite expires.
 * @param {Object} sessionUser - The user object of the person sending the invite.
 * @param {string} sessionUser.tenant_id - The ID of the organization/firm.
 * @param {string} sessionUser.auth_id - The ID of the sender.
 * @returns {Promise<Object>} The created database record.
 */
exports.createInvite = async (email, role, expiryDuration, sessionUser) => {
    const canCreateInvite = await exports.canCreateInvite(email, sessionUser);
    if (!canCreateInvite) {
        throw new ValidationError({ invite: "Invitation already pending for this user" })
    }

    return await invite.create({
        email, // Shorthand for email: email
        role,  // Shorthand for role: role
        tenant_id: sessionUser.tenant_id,
        token: generateInviteToken(),
        status: "pending",
        expires_at: getInviteExpirationDate(expiryDuration),
        invited_by: sessionUser.auth_id
    });
};

/**
 * Checks for and pending invites for the given user
 * 
 * @param {String} email - checks for any pending invite instance with same email
 * @param {Object} sessionUser - session user data
 * @returns {Boolean} if invite exists && expired return true else false
 */
exports.canCreateInvite = async (email, sessionUser) => {

    const existingInvite = await exports.getRecentInvite(email, sessionUser);
    if (!existingInvite) {
        return true
    }

    const checkExpirationStatus = getExpiryStatus(existingInvite.expires_at);
    if (checkExpirationStatus) {
        return true
    }

    return false; // cannot create invite 
}

/**
 * gets a latest invitation entry to specific user though email
 * 
 * @param {String} email email address of user to check invites
 * @returns {Promise<Object>} entry of the latest invite
 */
exports.getRecentInvite = async (email, sessionUser) => {
    return await invite.findOne({
        where: {
            email, tenant_id: sessionUser.tenant_id, status: "pending"
        }, order: [['createdAt', 'DESC']]
    })
}


exports.getInviteByToken = (token) => {
    return invite.findOne({
        where: {
            token
        }
    })
}

exports.InvitationClosure = (token, typeOfUpdate, options = {}) => {
    switch (typeOfUpdate) {
        case "accept":
            return invite.update(
                { status: "accepted", accepted_at: new Date() },
                {where:{token},...options}
            );
        //future cases
        default:
            throw new Error(`Unknown invite closure type: ${typeOfUpdate}`);
    }


}

exports.InvitationAccept = async (data) => {
    return sequelize.transaction(async (t) => {
        const { token, name, phone, password, avatar } = data;
        //get Invitation data and validate it
        const inv_data = await exports.getInviteByToken(token);
        if (!inv_data) throw new NotFoundError("Invitation not found");
        if (inv_data.status !== "pending") throw new ValidationError({ invite: "Invitation is no longer valid" });
        if (getExpiryStatus(inv_data.expires_at)) throw new ValidationError({ invite: "Invitation has expired" });
        //password hash 
        const password_hash = await hashPassword(password);

        //create a auth account 
        const auth_acc = await createAuthAccount(inv_data.email, password_hash, inv_data.tenant_id,inv_data.role, { transaction: t });

        //create user account 
        const user_acc = await createUser(name, phone, avatar, inv_data.tenant_id, auth_acc.id, { transaction: t });

        await exports.InvitationClosure(token, "accept", {transaction: t });
        return {
            success: true,
            message: "Invitation Accepted User Registered Successfully",
            data: {
                user: user_acc.name,
                user_id: user_acc.id,
                tenant_id: inv_data.tenant_id,
                auth_id: auth_acc.id
            }
        }

    })
}