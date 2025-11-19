require("dotenv").config();
const express = require("express");
const app = express();

//conntect db
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// routers
const authrouter = require("./routes/auth");
const jobrouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/jobs", authenticateUser, jobrouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
