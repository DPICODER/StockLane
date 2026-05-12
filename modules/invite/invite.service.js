const ValidationError = require("../../core/utils/errors/ValidationError");
const { generateInviteToken } = require("../../core/utils/generate-Invite-Token");
const { getExpiryStatus, getInviteExpirationDate } = require("../../core/utils/invite-expiry");
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
exports.createInvite =  async (email, role, expiryDuration,sessionUser) => {
    const canCreateInvite = await exports.canCreateInvite(email,sessionUser);
    if(!canCreateInvite){
        throw new ValidationError({invite:"Invitaion already pending for this user"})
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
exports.canCreateInvite = async (email,sessionUser)=>{
    
    const existingInvite = await exports.getRecentInvite(email,sessionUser);
    if(!existingInvite){
        return true
    }
    
    const checkExpirationStatus = getExpiryStatus(existingInvite.expires_at);
    if(checkExpirationStatus){
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
exports.getRecentInvite = async (email,sessionUser) =>{
    return await invite.findOne({
        where:{
            email,tenant_id:sessionUser.tenant_id,status:"pending"
        },order:[['createdAt','DESC']]
    })
}
