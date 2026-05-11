const crypto = require('crypto');

exports.generateInviteToken = ()=>{
    return crypto.randomBytes(8).toString('hex');
}

