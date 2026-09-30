# MindWell - A Simple Mental Wellness Journal

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

This proves AES-256 is working.

### 📅 Timeline Completed
- Week 1: Security & Core CRUD ✅
- Week 2: Mood & Data Viz ✅
- Week 3: Animations & Frontend Polish ✅
- Week 4: Premium & Export + Deployment ✅
