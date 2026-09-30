import { useState, useEffect } from 'react'
import { getMoodColor, getMoodEmoji } from './moodConfig'
import MoodChart from './MoodChart'
import BreathingExercise from './BreathingExercise'
import PremiumCard from './PremiumCard'

function App() {
  const [entry, setEntry] = useState("")
  const [mood, setMood] = useState("Happy")
  const [journals, setJournals] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [page, setPage] = useState("home") // home, login, journal
  const [user, setUser] = useState(localStorage.getItem("mindwell_user") || "")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const prompts = ["What made you smile today?", "What are you grateful for?", "Describe your energy level today", "What is stressing you out?"]
  const [currentPrompt] = useState(prompts[Math.floor(Math.random()*prompts.length)])
  const API_URL = "https://mindwell-backend-one.vercel.app/api/journals"

  const fetchJournals = async () => {
    try { const res = await fetch(API_URL); const data = await res.json(); setJournals(data) } catch(e) {}
  }
  useEffect(()=>{fetchJournals()},[])

  const handleLogin = () => {
    if(!email ||!password) return alert("Please enter email and password")
    localStorage.setItem("mindwell_user", email)
    setUser(email)
    setPage("journal")
  }
  const handleLogout = () => {
    localStorage.removeItem("mindwell_user")
    setUser("")
    setPage("home")
  }
  const handleSave = async () => {
    if(!entry) return alert("Write something first");
    await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({text: entry, mood})})
    setEntry(""); fetchJournals();
  }
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8,[STRIPPED] + encodeURIComponent(JSON.stringify(journals, null, 2))
    const a = document.createElement('a'); a.href = dataStr; a.download = "mindwell-data.json"; a.click()
  }

  return (
    <div style={{background: darkMode? "#1a1a2e" : "#e0f7fa", minHeight:"100vh", padding:"20px", transition:"0.3s"}}>

      {/* TOP BAR */}
      <div style={{maxWidth:"800px", margin:"0 auto 15px auto", display:"flex", justifyContent:"space-between"}}>
        <button onClick={()=>setPage("home")} style={{padding:"8px 15px", borderRadius:"20px", border:"none", cursor:"pointer", background:"white", fontWeight:"bold"}}>🏠 Home</button>
        <div style={{display:"flex", gap:"10px"}}>
          {user && <span style={{background:"white", padding:"8px 15px", borderRadius:"20px", fontSize:"12px"}}>👤 {user.split("@")[0]}</span>}
          {page==="journal" && <button onClick={handleExport} style={{padding:"8px 15px", borderRadius:"20px", border:"none", cursor:"pointer", background:"white", fontWeight:"bold"}}>📥 Export</button>}
          {user && <button onClick={handleLogout} style={{padding:"8px 15px", borderRadius:"20px", border:"none", cursor:"pointer", background:"#ff6b6b", color:"white", fontWeight:"bold"}}>Logout</button>}
          <button onClick={()=>setDarkMode(!darkMode)} style={{padding:"8px 15px", borderRadius:"20px", border:"none", cursor:"pointer", background: darkMode? "white" : "#1a1a2e", color: darkMode? "black" : "white", fontWeight:"bold"}}>
            {darkMode? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* 1. HOME PAGE */}
      {page==="home" && (
        <div style={{maxWidth:"800px", margin:"40px auto", background: darkMode? "#2d2d2d" : "white", padding:"40px 25px", borderRadius:"20px", color: darkMode? "white" : "black", textAlign:"center"}}>
          <h1 style={{fontSize:"50px", marginBottom:"10px"}}>Welcome! 👋</h1>
          <h2 style={{color: darkMode? "#ccc" : "#555", fontWeight:"normal"}}>To MindWell</h2>
          <p style={{marginTop:"20px", lineHeight:"1.6", color: darkMode? "#aaa" : "#666"}}>Your personal mental wellness companion. Encrypted, safe and private.</p>
          <button onClick={()=> user? setPage("journal") : setPage("login")} style={{marginTop:"30px", padding:"15px 40px", background:"#00acc1", color:"white", border:"none", borderRadius:"30px", fontWeight:"bold", fontSize:"18px", cursor:"pointer"}}>
            {user? "Go to Journal →" : "Get Started →"}
          </button>
          <div style={{textAlign:"center", marginTop:"50px", padding:"20px", color: darkMode? "#aaa" : "#555", fontSize:"14px"}}>
            <p>© 2026 MindWell</p><p style={{fontWeight:"bold"}}>Created by Rahema Shaikh</p>
          </div>
        </div>
      )}

      {/* 2. LOGIN PAGE */}
      {page==="login" && (
        <div style={{maxWidth:"400px", margin:"60px auto", background: darkMode? "#2d2d2d" : "white", padding:"35px 25px", borderRadius:"20px", color: darkMode? "white" : "black", textAlign:"center"}}>
          <h1 style={{marginBottom:"5px"}}>Welcome Back!</h1>
          <p style={{color:"gray", marginTop:"0"}}>Please login to continue</p>

          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" style={{width:"100%", padding:"12px", marginTop:"25px", borderRadius:"8px", border:"1px solid #ccc"}} />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:"12px", marginTop:"15px", borderRadius:"8px", border:"1px solid #ccc"}} />

          <button onClick={handleLogin} style={{width:"100%", marginTop:"20px", padding:"12px", background:"#00acc1", color:"white", border:"none", borderRadius:"8px", fontWeight:"bold", fontSize:"16px", cursor:"pointer"}}>
            Login / Sign Up
          </button>

          <p style={{marginTop:"20px", fontSize:"13px", color:"gray"}}>No account needed - just enter any email to login</p>
          <p style={{marginTop:"10px"}}><span onClick={()=>setPage("home")} style={{color:"#00acc1", cursor:"pointer", textDecoration:"underline"}}>← Back to Home</span></p>
        </div>
      )}

      {/* 3. JOURNAL PAGE */}
      {page==="journal" && (
        <>
          <div style={{maxWidth:"800px", margin:"0 auto", background: darkMode? "#2d2d2d" : "white", padding:"25px", borderRadius:"15px", color: darkMode? "white" : "black"}}>
            <h1 style={{textAlign:"center"}}>MindWell - Encrypted Journal</h1>
            <p style={{textAlign:"center", color:"gray"}}>Welcome, {user.split("@")[0]}!</p>
            <select value={mood} onChange={e=>setMood(e.target.value)} style={{width:"100%", padding:"10px", margin:"15px 0", border:`3px solid ${getMoodColor(mood)}`, borderRadius:"8px", fontWeight:"bold"}}>
              <option>Happy</option><option>Sad</option><option>Anxious</option><option>Energetic</option>
            </select>
            <textarea value={entry} onChange={e=>setEntry(e.target.value)} placeholder={currentPrompt} style={{width:"100%", height:"150px", padding:"10px", borderRadius:"8px"}} />
            <button onClick={handleSave} style={{width:"100%", marginTop:"10px", padding:"12px", background:getMoodColor(mood), color:"white", border:"none", borderRadius:"8px", fontWeight:"bold", cursor:"pointer"}}>
              Encrypt & Save as {getMoodEmoji(mood)} {mood}
            </button>
          </div>
          <div style={{maxWidth:"800px", margin:"20px auto"}}>
            <BreathingExercise darkMode={darkMode} />
            <MoodChart entries={journals} />
            <PremiumCard darkMode={darkMode} />
          </div>
          <div style={{maxWidth:"600px", margin:"20px auto"}}>
            <h2 style={{color: darkMode? "white" : "black"}}>History ({journals.length})</h2>
            {journals.map(j=>(
              <div key={j._id || j.id} style={{background: darkMode? "#2d2d2d" : "white", color: darkMode? "white" : "black", padding:"15px", borderRadius:"10px", marginBottom:"10px", borderLeft:`8px solid ${getMoodColor(j.mood)}`}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:"12px", color:"gray"}}>
                  <span>{new Date(j.date).toLocaleDateString()}</span>
                  <span style={{background:getMoodColor(j.mood), color:"white", padding:"3px 10px", borderRadius:"10px", fontWeight:"bold"}}>{getMoodEmoji(j.mood)} {j.mood}</span>
                </div>
                <p><b>{j.decryptedText || j.text}</b></p>
              </div>
            ))}
            <div style={{textAlign:"center", marginTop:"40px", padding:"20px", color: darkMode? "#aaa" : "#555", fontSize:"14px"}}>
              <p>© 2026 MindWell - Your mental wellness companion</p><p style={{fontWeight:"bold"}}>Created by Rahema Shaikh</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default App
