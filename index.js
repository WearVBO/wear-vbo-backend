const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
dotenv.config();
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(cors());
connectDB();

// TODO: always include allowed origins for frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://wear-vbo.vercel.app",
  "https://www.wearvbo.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // for authorization headers or cookies
  })
);

app.use(express.json());

// initialize the send response.
app.get("/", (req, res) => {
  res.send("hello world, wearVBO server works");
});

// routes use
app.use("/api/auth", authRoutes);

// Port === 5000
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
