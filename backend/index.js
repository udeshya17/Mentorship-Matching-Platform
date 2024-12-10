const express = require("express");
require('dotenv').config();
const connectDB = require("./db/config");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, ()=>{
    console.log(`Backend is listening at ${PORT}`);
})