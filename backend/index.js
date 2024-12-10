const express = require("express");
require('dotenv').config();
const connectDB = require("./db/config");
const authRoutes = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`Backend is listening at ${PORT}`);
})