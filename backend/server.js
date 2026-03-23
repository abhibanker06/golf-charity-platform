const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.set("trust proxy", 1);


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://golf-charity-platform-peach.vercel.app",
];


const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);

    
    if (origin.includes("localhost")) {
      return callback(null, true);
    }

    
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());



app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});



const authRoutes = require("./routes/authRoutes");
const charityRoutes = require("./routes/charityRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const drawRoutes = require("./routes/drawRoutes");
const winnerRoutes = require("./routes/winnerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/winners", winnerRoutes);



app.get("/", (req, res) => {
  res.send("Golf Charity API is running...");
});



app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
