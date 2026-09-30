# MindWell - A Simple Mental Wellness Journal
**Name:** [Shaikh Raheman Shaikh Rahim]
**Intern ID:** [shaikhraheman975@gmail.com]
**Live Demo:** https://mindwell-self.vercel.app
**GitHub:** https://github.com/shaikhraheman40705-bot/Mindwell
**Domain:** Web Development | **Persevex Internship Project 2026**

MindWell is a privacy-focused digital journal designed to promote mindfulness. In a high-stress digital world, this is a safe space: a minimalist, secure application that helps users practice gratitude, track their emotional state, and decompress.

> **Data Privacy is the #1 feature, not an afterthought.**

### 🔐 Security Note (Critical - PDF Page 2)

**The Problem:** If a database admin looks at the database, they should NOT be able to read the user's journal entries.

**The Solution:** We use **AES-256 encryption** to encrypt the `content` field in the Mongoose model before saving to MongoDB.

- Library: `crypto-js`
- Encryption: `CryptoJS.AES.encrypt(content, SECRET_KEY)` on save
- Decryption: Only when the user requests it with their key
- Result: Raw data in MongoDB looks like `U2FsdGVkX1+8...` (gibberish) - proving privacy.

### 💻 Tech Stack

- **Frontend:** React.js (Vite), Framer Motion (for breathing animation), Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Security:** AES-256 (Crypto-JS), bcrypt for hashing

### ✨ Key Features

**Phase 1: Secure Journaling**
- Guided Prompts: "What made you smile today?", "What are you grateful for?"
- End-to-End Encryption at Rest

**Phase 2: Mood Tracking & Analytics**
- Daily mood logging (1-10) with energy levels
- Mood over Time - Line Graph (Chart.js)
- Most Common Emotions - Pie Chart

**Phase 3: Interactive Wellness Tools**
- Breathing Assistant: Inhale 4s, Hold 7s, Exhale 8s
- Tech: Framer Motion smooth expanding/contracting circle
- Minimalist UI with whitespace & soft colors + **Dark Mode (Must-have)**

**Phase 4: Data Freedom**
- Freemium Model
- Data Export: Download all data as JSON/PDF (GDPR Compliant)

### 🚀 Live Application

- **Frontend:** https://mindwell-self.vercel.app
- **Backend API:** https://mindwell-backend-one.vercel.app
- **GitHub:** This repository

### 📸 Privacy Demo Proof

**MongoDB Atlas Screenshot:**
`content: "U2FsdGVkX1/q8dX9W2jK...5T+9Q=="` -> Encrypted gibberish, not readable text.
### 🔐 Security & Privacy - AES-256 Encryption Proof
<img width="1920" height="1080" alt="Screenshot 2026-09-30 150205" src="https://github.com/user-attachments/assets/d9f7e997-5b96-4bb1-abbb-2f59f7404ca1" />
### Loging Mood
<img width="1691" height="946" alt="Screenshot 2026-09-30 151343" src="https://github.com/user-attachments/assets/ef3b02ae-f29d-48e4-8c98-e3b1ded32a30" />

This proves AES-256 is working.
### ✨ Secure Journaling
<img width="1462" height="895" alt="Screenshot 2026-09-30 151747" src="https://github.com/user-attachments/assets/ea69f1dd-6013-4118-bf1c-ebbb73178050" />
### 📊 Mood Tracking -> Mood wali photo drag
<img width="1691" height="938" alt="Screenshot 2026-09-30 151540" src="https://github.com/user-attachments/assets/3c96b225-d487-4372-9a76-b03ed39a3a55" />
### 🧘 Breathing Assistant -> Breathe wali photo drag
<img width="1440" height="788" alt="Screenshot 2026-09-30 151640" src="https://github.com/user-attachments/assets/0e57027f-94e7-41fd-90a2-4ba80116b392" />

### 📅 Timeline Completed
- Week 1: Security & Core CRUD ✅
- Week 2: Mood & Data Viz ✅
- Week 3: Animations & Frontend Polish ✅
- Week 4: Premium & Export + Deployment ✅
