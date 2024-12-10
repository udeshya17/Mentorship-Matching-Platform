const express = require("express");
require('dotenv').config();
const connectDB = require("./db/config");
const userRoutes = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/register", userRoutes);

app.listen(PORT, ()=>{
    console.log(`Backend is listening at ${PORT}`);
})