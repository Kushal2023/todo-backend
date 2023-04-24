const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const todoRoutes = require("./routes/todo")

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => console.log(err));

app.use(cors())
app.use(express.json())

app.use("/v1/tasks",todoRoutes)

app.listen(8000, () => {
  console.log("Server listening on 8000");
});
