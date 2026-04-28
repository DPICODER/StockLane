const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  const statusCode = err.statusCode || 500;
  const isDev = process.env.APP_ENV === "development";
  const isOperational = err.isOperational || false;

  let message = err.message || "Internal Server Error";

  if (!isDev && !isOperational) {
    message = "Something went wrong";
  }

  const response = {
    success: false,
    message,
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  if (isDev) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;