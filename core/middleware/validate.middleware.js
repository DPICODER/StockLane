const ValidationError = require("../utils/errors.js/ValidationError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const formattedErrors = {};

      error.details.forEach((err) => {
        const key = err.path[0];
        formattedErrors[key] = err.message.replace(/"/g, "");
      });

      return next(new ValidationError(formattedErrors));
    }

    req.body = value;
    next();
  };
};

module.exports = validate;