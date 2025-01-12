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
    origin: "*", // Allow requests from any origin
    optionsSuccessStatus: 200,
    credentials: true, // This won't work with `*`, so remove if using this.
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