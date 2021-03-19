const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const userRouter = require("./router/userRouter");

//ENV VARIABEL CONFIGURATION
const config = dotenv.config({ path: "config.env" });

//INITIALIZE APP
const app = express();

//CONNECT TO DATABASE
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const connectDB = mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
connectDB.then(() => console.log("Success connecting to database"));

//GLOBAL MIDDLEWARE
app.use(express.json());

//Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//STATIC FILE
app.use(express.static(path.join(__dirname, "public")));

//API ROUTER
app.use("/api/v1/user", userRouter);

//Server Listening
app.listen(process.env.PORT, () => {
  console.log(`Success connect to port ${process.env.PORT}!`);
});
