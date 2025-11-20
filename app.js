require("dotenv").config();

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const mongosanitize = require("express-mongo-sanitize");

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

// extra security packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(mongosanitize());
//app.use(xssclean());

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
