const express = require("express");
require('dotenv').config();
const connectDB = require("./db/config");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
      origin: [
        "http://localhost:5173", // Frontend origin
        "http://localhost:8082", // Backend origin (if needed, though usually not required)
      ],
      optionsSuccessStatus: 200,
      credentials: true, 
    })
  );

connectDB();

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`Backend is listening at ${PORT}`);
})