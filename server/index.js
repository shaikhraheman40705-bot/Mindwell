const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// --- Config ---
const SECRET_KEY = process.env.ENCRYPTION_KEY || "mindwell-secret-key-2024-rahema";
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

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    console.log('DB Error:', e);
    res.status(500).json({ error: e.message });
  }
});

// --- Schema ---
const journalSchema = new mongoose.Schema({
  text: { type: String, required: true }, // encrypted text save hoga
  mood: { type: String, default: "Happy" },
  createdAt: { type: Date, default: Date.now }
});

const Journal = mongoose.model("Journal", journalSchema);

// --- ROUTES ---

// GET all journals (decrypt karke bhejna)
app.get('/api/journals', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    
    const decrypted = journals.map(j => {
      try {
        const bytes = CryptoJS.AES.decrypt(j.text, SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return {
          _id: j._id,
          text: originalText || j.text, // agar decrypt fail hua toh as it is
          mood: j.mood,
          createdAt: j.createdAt
        };
      } catch (err) {
        return j;
      }
    });

    res.json(decrypted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new journal (encrypt karke save karna)
app.post('/api/journals', async (req, res) => {
  try {
    const { text, mood } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });

    // ENCRYPTION - Ye sabse important hai
    const encryptedText = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();

    const newJournal = new Journal({
      text: encryptedText,
      mood: mood || "Happy"
    });

    await newJournal.save();
    res.json({ success: true, message: "Saved encrypted!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const SECRET_KEY = process.env.ENCRYPTION_KEY || "mindwell-secret-key-2024-rahema";
const MONGO_URI = process.env.MONGO_URI;

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

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const journalSchema = new mongoose.Schema({
  text: { type: String, required: true },
  mood: { type: String, default: "Happy" },
  createdAt: { type: Date, default: Date.now }
});

const Journal = mongoose.model("Journal", journalSchema);

app.get('/api/journals', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    const decrypted = journals.map(j => {
      try {
        const bytes = CryptoJS.AES.decrypt(j.text, SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return { _id: j._id, text: originalText || j.text, mood: j.mood, createdAt: j.createdAt };
      } catch { return j; }
    });
    res.json(decrypted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/journals', async (req, res) => {
  try {
    const { text, mood } = req.body;
    const encryptedText = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    const newJournal = new Journal({ text: encryptedText, mood });
    await newJournal.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => res.send("MindWell Backend Running with AES-256 Encryption 🔒"));
module.exports = app;
});

app.get('/', (req, res) => {
  res.send("MindWell Backend Running with AES-256 Encryption 🔒");
});

module.exports = app;
