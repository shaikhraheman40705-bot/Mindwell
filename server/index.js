const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// --- Config ---
const SECRET_KEY = process.env.ENCRYPTION_KEY || "mindwell-secret-key-2024";
const MONGO_URI = process.env.MONGO_URI;

// --- FIXED: Vercel Cached DB Connect ---
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Connect before every API call
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    console.log('DB Error:', e);
    res.status(500).json({ error: e.message });
  }
});

// --- Schema with Encryption ---
const JournalSchema = new mongoose.Schema({
  mood: String,
  encryptedText: String, 
  date: { type: Date, default: Date.now }
});
const Journal = mongoose.model('Journal', JournalSchema);

// --- Encryption Helpers ---
const encrypt = (text) => CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
const decrypt = (cipher) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch { return "Decryption Failed"; }
};

// --- Routes ---
app.get("/", (req, res) => res.send("MindWell Backend Running!"));

app.get("/api/journals", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    const decrypted = journals.map(j => ({
      _id: j._id,
      mood: j.mood,
      date: j.date,
      decryptedText: decrypt(j.encryptedText),
      text: decrypt(j.encryptedText) 
    }));
    res.json(decrypted);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/journals", async (req, res) => {
  try {
    const { text, mood } = req.body;
    const newEntry = new Journal({
      mood,
      encryptedText: encrypt(text)
    });
    await newEntry.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = app;