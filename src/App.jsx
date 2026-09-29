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
  const prompts = ["What made you smile today?", "What are you grateful for?", "Describe your energy level today", "What is stressing you out?"]
  const [currentPrompt] = useState(prompts[Math.floor(Math.random()*prompts.length)])

  const API_URL = "https://mindwell-backend-one.vercel.app/api/journals"

  const fetchJournals = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setJournals(data)
    } catch(e) { console.log("Backend error", e) }
  }
  useEffect(()=>{fetchJournals()},[])

  const handleSave = async () => {
    if(!entry) return alert("Write something first");
    await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'},
       body: JSON.stringify({text: entry, mood})})
    setEntry(""); fetchJournals();
  }

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(journals, null, 2))
    const a = document.createElement('a')
    a.href = dataStr
    a.download = "mindwell-data.json"
    a.click()
  }
  
  return (
    <div style={{background: darkMode? "#1a1a2e" : "#e0f7fa", minHeight:"100vh", padding:"20px", transition:"0.3s"}}>
      <div style={{maxWidth:"800px", margin:"0 auto 15px auto", display:"flex", justifyContent:"space-between"}}>
        <button onClick={handleExport} style={{padding:"8px 15px", borderRadius:"20px", border:"none", cursor:"pointer", background:"white", fontWeight:"bold"}}>📥 Export</button>
        <button onClick={()=>setDarkMode(!darkMode)} style={{padding:"8px 15px", borderRadius:"20px", border:"none", cursor:"pointer", background: darkMode? "white" : "#1a1a2e", color: darkMode? "black" : "white", fontWeight:"bold"}}>
          {darkMode? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <div style={{maxWidth:"800px", margin:"0 auto", background: darkMode? "#2d2d2d" : "white", padding:"25px", borderRadius:"15px", color: darkMode? "white" : "black"}}>
        <h1 style={{textAlign:"center"}}>MindWell - Encrypted Journal</h1>
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
      </div>
    </div>
  )
}
export default App