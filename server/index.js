const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Environment variables - Vercel pe ye Settings me dalna hai
const SECRET_KEY = process.env.ENCRYPTION_KEY || "mindwell@123";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mindwell";

// 1. MongoDB Connect
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected - MindWell'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

// 2. Test Route
app.get("/", (req, res) => {
  res.send("MindWell Backend Running!");
});

// 3. Example API - yaha tumhare saare routes aayenge
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/journal', require('./routes/journal'))

// Vercel ke liye bahut zaroori - app.listen nahi karna
module.exports = app;