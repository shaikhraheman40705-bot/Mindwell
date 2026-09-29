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

// --- DB Connect ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

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