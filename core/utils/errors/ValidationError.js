const AppError = require("./AppError");

class ValidationError extends AppError {
  constructor(errors, message =  "Validation Error") {
    super(message, 400);
    this.errors = errors;
  }
}

module.exports = ValidationError;