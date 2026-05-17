const crypto = require('crypto');

exports.generateInviteToken = ()=>{
    return crypto.randomBytes(32).toString('hex');
}

