import { useState, useEffect } from 'react'
import Home from './Home'
import Learn from './learn'
import Resources from './Resources'
import BreathingExercise from './BreathingExercise'
import MoodChart from './MoodChart'

function App() {
  const [page, setPage] = useState("home")
  const [userType, setUserType] = useState("user")
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(localStorage.getItem("mindwell_user") || "")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [entry, setEntry] = useState("")
  const [mood, setMood] = useState("Happy")
  const [journals, setJournals] = useState([])

  const API_URL = "https://mindwell-backend-one.vercel.app/api/journals"
  useEffect(() => { fetch(API_URL).then(r=>r.json()).then(d=>setJournals(d)).catch(()=>{}) }, [])

  const handleLogin = () => {
    if(!email ||!password) return alert("Email and Password likho")
    localStorage.setItem("mindwell_user", email)
    setUser(email)
    setPage("logmood")
  }
  const handleLogout = () => {
    localStorage.removeItem("mindwell_user")
    setUser("")
    setPage("home")
  }
  const handleSave = async () => {
    if(!entry) return alert("Write something")
    await fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({text: entry, mood})})
    setEntry("")
    const res = await fetch(API_URL); setJournals(await res.json())
  }
  const handleSavePDF = () => {
    if(journals.length === 0) return alert("Koi entry nahi hai")
    let text = "MindWell - My Mood Journal\n\n"
    journals.forEach((j, i) => { text += `${i+1}. Mood: ${j.mood} - ${j.text}\n\n` })
    const blob = new Blob([text], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "MindWell-Journal.txt"
    a.click()
  }

  return (
    <div style={{minHeight:"100vh", background: darkMode? "#1a1a2e" : "#f8f9ff", fontFamily:"Arial", padding:"20px", transition:"0.3s"}}>

      <div style={{maxWidth:"800px", margin:"0 auto", background: darkMode? "#2d2d2d" : "white", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px", borderRadius:"50px", boxShadow:"0 8px 20px rgba(0,0,0,0.08)", gap:"5px", flexWrap:"wrap"}}>
        <div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
        {[
          {id:"home", label:"Home"},
          {id:"logmood", label:"Log Mood"},
          {id:"breathe", label:"Breathe"},
          {id:"learn", label:"Learn"},
          {id:"resources", label:"Resources"},
        ].map(item => (
          <span key={item.id} onClick={()=> item.id==="logmood" &&!user? setPage("home") : setPage(item.id)} style={{padding:"10px 14px", borderRadius:"30px", cursor:"pointer", fontSize:"13px", fontWeight: page===item.id? "bold" : "500", background: page===item.id? "#7c5cff" : "transparent", color: page===item.id? "white" : darkMode? "white" : "#555"}}>{item.label}</span>
        ))}
        </div>
        <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
          <span onClick={()=>setDarkMode(!darkMode)} style={{padding:"10px 14px", borderRadius:"30px", cursor:"pointer", fontSize:"13px", background: darkMode? "white" : "#1a1a2e", color: darkMode? "black" : "white", fontWeight:"bold"}}>{darkMode? "☀️ Light" : "🌙 Dark"}</span>
          {user && <span onClick={handleLogout} style={{padding:"10px 14px", borderRadius:"30px", cursor:"pointer", fontSize:"13px", background:"#ff6b6b", color:"white", fontWeight:"bold"}}>Logout</span>}
        </div>
      </div>

      <div style={{maxWidth:"600px", margin:"40px auto"}}>
        {page==="home" && (
          <div style={{background: darkMode? "#2d2d2d" : "white", padding:"40px 30px", borderRadius:"15px", textAlign:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.05)", color: darkMode? "white" : "black"}}>
            <h1 style={{fontSize:"38px", fontWeight:"bold", marginBottom:"10px"}}>Welcome</h1>
            <p style={{color: darkMode? "#aaa" : "#888", marginBottom:"30px"}}>Please sign in to continue.</p>
            <div style={{display:"flex", background: darkMode? "#1a1a2e" : "#f1f0f5", borderRadius:"10px", padding:"5px", marginBottom:"25px"}}>
              <button onClick={()=>setUserType("user")} style={{flex:1, padding:"12px", borderRadius:"8px", border:"none", background: userType==="user"? "#7c5cff" : "transparent", color: userType==="user"? "white" : "#666", fontWeight:"bold", cursor:"pointer"}}>User / Client</button>
              <button onClick={()=>setUserType("therapist")} style={{flex:1, padding:"12px", borderRadius:"8px", border:"none", background: userType==="therapist"? "#7c5cff" : "transparent", color: userType==="therapist"? "white" : "#666", fontWeight:"bold", cursor:"pointer"}}>Therapist / Admin</button>
            </div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" style={{width:"100%", padding:"14px", borderRadius:"10px", border:"1px solid #e0e0e0", background: darkMode? "#1a1a2e" : "#f9f9f9", color: darkMode? "white" : "black", marginBottom:"12px", boxSizing:"border-box"}} />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:"14px", borderRadius:"10px", border:"1px solid #e0e0e0", background: darkMode? "#1a1a2e" : "#f9f9f9", color: darkMode? "white" : "black", marginBottom:"20px", boxSizing:"border-box"}} />
            <button onClick={handleLogin} style={{width:"100%", padding:"14px", borderRadius:"30px", border:"none", background:"#3f37c9", color:"white", fontWeight:"bold", fontSize:"16px", cursor:"pointer"}}>Sign In as {userType==="user"? "User" : "Therapist"}</button>
          </div>
        )}

        {page==="logmood" && (
          <div style={{background: darkMode? "#2d2d2d" : "white", padding:"25px", borderRadius:"15px", color: darkMode? "white" : "black"}}>
            <h1>Log Your Mood </h1>
            <select value={mood} onChange={e=>setMood(e.target.value)} style={{width:"100%", padding:"10px", margin:"10px 0", borderRadius:"8px"}}><option>Happy</option><option>Sad</option><option>Anxious</option><option>Energetic</option></select>
            <textarea value={entry} onChange={e=>setEntry(e.target.value)} placeholder="How are you feeling today?" style={{width:"100%", height:"100px", padding:"10px", borderRadius:"8px", background: darkMode? "#1a1a2e" : "white", color: darkMode? "white" : "black"}} />
            <button onClick={handleSave} style={{width:"100%", padding:"12px", background:"#7c5cff", color:"white", border:"none", borderRadius:"8px", marginTop:"10px", fontWeight:"bold", cursor:"pointer"}}>Save Mood</button>
            <button onClick={handleSavePDF} style={{width:"100%", padding:"12px", background:"white", color:"#7c5cff", border:"2px solid #7c5cff", borderRadius:"8px", marginTop:"8px", fontWeight:"bold", cursor:"pointer"}}>📄 Save Output PDF / TXT</button>

            <div style={{marginTop:"20px"}}><MoodChart entries={journals} /></div>

            <div style={{marginTop:"25px"}}>
              <h3 style={{marginBottom:"10px"}}> Your History ({journals.length})</h3>
              {journals.length === 0? <p style={{color:"#888", fontSize:"13px"}}>No entries yet. Start logging!</p> :
                <div style={{display:"flex", flexDirection:"column", gap:"8px", maxHeight:"300px", overflowY:"auto"}}>
                  {journals.map((j,i)=>(
                    <div key={i} style={{padding:"12px", background: darkMode?"#3a3a3a" : "#f5f5ff", borderRadius:"10px", borderLeft:"4px solid #7c5cff"}}>
                      <div style={{display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#888"}}>
                        <span style={{fontWeight:"bold", color:"#7c5cff"}}>{j.mood}</span>
                        <span>{new Date(j.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                      <p style={{margin:"5px 0 0 0", fontSize:"14px"}}>{j.text}</p>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        )}

        {page==="breathe" && <BreathingExercise darkMode={darkMode} />}
        {page==="learn" && <Learn darkMode={darkMode} />}
        {page==="resources" && <Resources darkMode={darkMode} />}
      </div>

      <div style={{maxWidth:"700px", margin:"50px auto 0 auto", background: darkMode? "#2d2d2d" : "white", padding:"25px", borderRadius:"20px", textAlign:"center", boxShadow:"0 -5px 20px rgba(0,0,0,0.03)"}}>
        <h3 style={{margin:"0 0 5px 0", color:"#7c5cff"}}>MindWell </h3>
        <p style={{margin:"0 0 15px 0", fontSize:"13px", color: darkMode? "#aaa" : "#888"}}>Your personal mental wellness companion. You are not alone.</p>
        <div style={{display:"flex", justifyContent:"center", gap:"20px", fontSize:"13px", color: darkMode? "#ccc" : "#555", flexWrap:"wrap"}}>
          <span>📧 shaikhraheman40705@gmail.com</span>
        </div>
        <div style={{marginTop:"15px", borderTop:"1px solid #f0f0f0", paddingTop:"15px", display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#aaa", flexWrap:"wrap", gap:"10px"}}>
          <span>© 2026 MindWell</span>
          <span>Created with  by Rahema Shaikh</span>
          <span>Privacy | Terms | Support</span>
        </div>
      </div>
    </div>
  )
}
export default App
