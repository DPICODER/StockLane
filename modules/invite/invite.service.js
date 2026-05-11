const ValidationError = require("../../core/utils/errors.js/ValidationError");
const { generateInviteToken } = require("../../core/utils/generate-Invite-Token");
const { getInviteExpiration, getExpiryStatus } = require("../../core/utils/invite-expiry");
const invite = require("./invite.model");

/**
 * Creates a new pending invitation in the database.
 * 
 * @param {string} email - The email address of the person being invited.
 * @param {string} role - The permission level assigned to the invitee.
 * @param {number} expiryDuration - Number of days until the invite expires.
 * @param {Object} sessionUser - The user object of the person sending the invite.
 * @param {string} sessionUser.tenant_id - The ID of the organization/firm.
 * @param {string} sessionUser.user_id - The ID of the sender.
 * @returns {Promise<Object>} The created database record.
 */
exports.createInvite =  (email, role, expiryDuration,sessionUser) => {
    const checkInviteExists = exports.getPendingInvites(email);
    if(!checkInviteExists){
        throw new ValidationError({invite:"Invitaion already pending for this user"})
    }
    return invite.create({
        email, // Shorthand for email: email
        role,  // Shorthand for role: role
        tenant_id: sessionUser.tenant_id,
        token: generateInviteToken(),
        status: "pending",
        expires_at: getInviteExpiration(expiryDuration),
        invited_by: sessionUser.auth_id
    });
};

/**
 * Checks for and pending invites for the given user
 * 
 * @param {String} email - checks for any pending invite instance with same email
 * @returns {Promise<Object>} If a matching instance found or null
 */
exports.getPendingInvites = async (email)=>{
    const existingInvite = await exports.getRecentInvite(email);
    console.log("existing Invite",existingInvite);
    if(!existingInvite){
        throw new ValidationError({invite:"No invitaion found"})
    }
    const checkExpirationStatus = getExpiryStatus(existingInvite.expires_at);
    if(!checkExpirationStatus){
        throw new ValidationError({invite:"Invitaion for this user still acitve"})
    }
    return existingInvite;
}

/**
 * gets a latest invitation entry to specific user though email
 * 
 * @param {String} email email address of user to check invites
 * @returns {Promise<Object>} entry of the latest invite
 */
exports.getRecentInvite = async (email) =>{
    return await invite.findOne({
        where:{
            email
        },order:[['createdAt','ASC']]
    })
}

// TODO:re-send a new invite and figure out the entry is created on db and the error is also pooping up
// TODO: better luck