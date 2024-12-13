const express = require("express");
require('dotenv').config();
const connectDB = require("./db/config");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const mentorshipRoutes = require("./routes/mentorship.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();
const PORT = process.env.PORT;

// cors policy error handling
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

// routes
app.use("/auth", authRoutes);
app.use('/api', profileRoutes);

app.use('/api/mentorship', mentorshipRoutes);
app.use('/api', notificationRoutes);

app.listen(PORT, ()=>{
    console.log(`Backend is listening at ${PORT}`);
})