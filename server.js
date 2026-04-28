const express = require('express');
require('dotenv').config({ quiet: true });
const sequelize = require('./core/db/database');
const app = express();
const port = process.env.APP_PORT || 3000;
const auth = require('./modules/auth/auth.routes');
const errorMiddleware = require('./core/middleware/error.middleware');
const NotFoundError = require('./core/utils/errors.js/NotFoundError');


app.use(express.json());
app.use("/api/v1/auth",auth);


app.get('/', (req, res) => {
    res.send("Server is up")
})

app.use((req,res,next)=>{
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
});
// the errorMiddleware must be placed under all the routes u want to placed
app.use(errorMiddleware);


async function startServer() {
  try {
    console.log("Connecting to DB...");

    await sequelize.authenticate();
    console.log("DB authenticated");

    await sequelize.sync();
    console.log("DB synced");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1); // kill process if DB fails
  }
}

startServer();

module.exports = app;