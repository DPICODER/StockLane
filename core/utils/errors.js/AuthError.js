const AppError = require('./AppError');

class AuthError extends AppError {
    constructor(message = 'Unathorized'){
        super(message,401);
    }
}


module.exports = AuthError;