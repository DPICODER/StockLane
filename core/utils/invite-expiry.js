/**
 * Calculates the expiration date for an Invitation
 * 
 * @param {number} expiryWindow - The number of days from now until the invite expires
 * @returns {date} A Date object representing the expiration timestamp
 */
exports.getInviteExpirationDate = (expiryWindow) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expiryWindow);
    return expirationDate;
}

/**
 * Compares the expiry date to current date
 * 
 * @param {Date} date - date to compare expiry to current date time
 * @returns {Boolean} true if expired false if still active 
 */
exports.getExpiryStatus = (date) =>{
    const expirationDate = new Date(date);
    const currentDate = new Date();
    return currentDate > expirationDate ? true : false;
}


