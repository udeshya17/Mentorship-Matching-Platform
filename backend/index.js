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

// Updated CORS configuration
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials like cookies, authorization headers
    optionsSuccessStatus: 200, // For legacy browsers
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