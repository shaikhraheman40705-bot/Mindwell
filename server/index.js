const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "mindwell@123";

// 1. MongoDB Connect
mongoose.connect('mongodb://localhost:27017/mindwell')
  .then(() => console.log('✅ MongoDB Connected - MindWell'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// 2. Schemma
const journalSchema = new mongoose.Schema({
  encryptedText: String,
  decryptedText: String,
  mood: String,
  date: String,
  createdAt: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', journalSchema);

function encryptData(t){return CryptoJS.AES.encrypt(t, SECRET_KEY).toString()}
function decryptData(c){const b=CryptoJS.AES.decrypt(c, SECRET_KEY); return b.toString(CryptoJS.enc.Utf8)}

// 3. POST - MongoDB save 
app.post('/api/journals', async (req,res)=>{
  const {text, mood} = req.body;
  const enc = encryptData(text);
  const entry = new Journal({
    encryptedText: enc, 
    decryptedText: text, 
    mood: mood, 
    date: new Date().toLocaleString()
  });
  await entry.save();
  console.log("SAVED IN MONGODB:", enc);
  res.json(entry);
});

// 4. GET -
app.get('/api/journals', async (req,res)=>{
  const journals = await Journal.find().sort({createdAt: -1});
  res.json(journals);
});

app.listen(5001, ()=>console.log('Server running on 5001'));