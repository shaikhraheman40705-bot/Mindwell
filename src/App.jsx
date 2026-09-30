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
  const [page, setPage] = useState("home")
  const [user, setUser] = useState(localStorage.getItem("mindwell_user") || "")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const prompts = ["What made you smile today?", "What are you grateful for?"]
  const [currentPrompt] = useState(prompts[0])
  const API_URL = "https://mindwell-backend-one.vercel.app/api/journals"

  const fetchJournals = async () => {
    try { const res = await fetch(API_URL); const data = await res.json(); setJournals(data) } catch(e) {}
  }
  useEffect(()=>{fetchJournals()},[])

  const handleLogin = () => {
    if(!email ||!password) return alert("Email password dalo")
    localStorage.setItem("mindwell_user", email)
    setUser(email)
    setPage("journal")
  }

  const handleSave = async () => {
    if(!entry) return alert("Write something first");
    await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({text: entry, mood})})
    setEntry(""); fetchJournals();
  }

  const handleExport = () => {
    const fileData = JSON.stringify(journals, null, 2);
    const blob = new Blob([fileData], {type: "text/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = "mindwell-data.json"; a.click();
  }

  return (
    <div style={{background: darkMode? "#1a1a2e" : "#e0f7fa", minHeight:"100vh", padding:"20px"}}>
      <div style={{maxWidth:"800px", margin:"0 auto 15px auto", display:"flex", justifyContent:"space-between"}}>
        <button onClick={()=>setPage("home")} style={{padding:"8px 15px", borderRadius:"20px", border:"none", background:"white", fontWeight:"bold"}}>🏠 Home</button>
        <button onClick={()=>setDarkMode(!darkMode)} style={{padding:"8px 15px", borderRadius:"20px", border:"none", background: darkMode? "white" : "#1a1a2e", color: darkMode? "black" : "white"}}>{darkMode? "☀️ Light" : "🌙 Dark"}</button>
      </div>

      {page==="home" && (
        <div style={{maxWidth:"800px", margin:"40px auto", background: darkMode? "#2d2d2d" : "white", padding:"40px", borderRadius:"20px", textAlign:"center", color: darkMode? "white":"black"}}>
          <h1 style={{fontSize:"48px"}}>Welcome! 👋</h1>
          <p>Your mental wellness companion</p>
          <button onClick={()=> user? setPage("journal") : setPage("login")} style={{marginTop:"20px", padding:"15px 40px", background:"#00acc1", color:"white", border:"none", borderRadius:"30px", fontWeight:"bold"}}>Get Started →</button>
          <div style={{marginTop:"40px", fontSize:"14px", color:"gray"}}>© 2026 MindWell | Created by Rahema Shaikh</div>
        </div>
      )}

      {page==="login" && (
        <div style={{maxWidth:"400px", margin:"40px auto", background:"white", padding:"30px", borderRadius:"20px", textAlign:"center"}}>
          <h2>Login</h2>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%", padding:"12px", marginTop:"15px"}} />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:"12px", marginTop:"10px"}} />
          <button onClick={handleLogin} style={{width:"100%", marginTop:"15px", padding:"12px", background:"#00acc1", color:"white", border:"none", borderRadius:"8px"}}>Login</button>
          <p onClick={()=>setPage("home")} style={{marginTop:"15px", color:"#00acc1", cursor:"pointer"}}>← Back to Home</p>
        </div>
      )}

      {page==="journal" && (
        <div style={{maxWidth:"800px", margin:"0 auto", background:"white", padding:"25px", borderRadius:"15px"}}>
          <h1 style={{textAlign:"center"}}>MindWell - Encrypted Journal</h1>
          <p style={{textAlign:"center"}}>Welcome, {user.split("@")[0]}!</p>
          <select value={mood} onChange={e=>setMood(e.target.value)} style={{width:"100%", padding:"10px", margin:"10px 0"}}><option>Happy</option><option>Sad</option><option>Anxious</option><option>Energetic</option></select>
          <textarea value={entry} onChange={e=>setEntry(e.target.value)} placeholder={currentPrompt} style={{width:"100%", height:"120px"}} />
          <button onClick={handleSave} style={{width:"100%", padding:"12px", background:getMoodColor(mood), color:"white", border:"none", borderRadius:"8px", marginTop:"10px"}}>Save as {getMoodEmoji(mood)} {mood}</button>
          <button onClick={handleExport} style={{width:"100%", padding:"10px", marginTop:"10px"}}>📥 Export Data</button>
          <button onClick={()=>{localStorage.removeItem("mindwell_user"); setUser(""); setPage("home")}} style={{width:"100%", padding:"10px", marginTop:"10px", background:"#ff6b6b", color:"white", border:"none", borderRadius:"8px"}}>Logout</button>
          <div style={{marginTop:"20px"}}><MoodChart entries={journals} /><BreathingExercise darkMode={darkMode} /><PremiumCard darkMode={darkMode} /></div>
          <h3>History ({journals.length})</h3>
          {journals.map(j=>(<div key={j._id || j.id} style={{borderLeft:`6px solid ${getMoodColor(j.mood)}`, padding:"10px", marginBottom:"10px", background:"#f9f9f9"}}><small>{new Date(j.date).toLocaleDateString()} - {j.mood}</small><p>{j.decryptedText || j.text}</p></div>))}
          <div style={{textAlign:"center", marginTop:"20px", color:"gray"}}><p>© 2026 MindWell | Created by Rahema Shaikh</p></div>
        </div>
      )}
    </div>
  )
}
export default App
