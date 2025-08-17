const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// initialize the send response.
app.get("/", (req, res) => {
  res.send("hello world, wearVBO server works");
});

// Port === 5000
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
