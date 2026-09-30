import { useState, useEffect } from 'react'
import Home from './Home'
import Learn from './learn'
import Resources from './Resources'

function App() {
  const [page, setPage] = useState("home")
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(localStorage.getItem("mindwell_user") || "")
  const [email, setEmail] = useState("shaikhraheman40705@gmail.com")
  const [password, setPassword] = useState("")
  const [entry, setEntry] = useState("")
  const [mood, setMood] = useState("Happy")
  const [journals, setJournals] = useState([])

  const API_URL = "https://mindwell-backend-one.vercel.app/api/journals"

  useEffect(() => {
    fetch(API_URL).then(r=>r.json()).then(d=>setJournals(d)).catch(()=>{})
  }, [])

  const handleLogin = () => {
    if(!email ||!password) return alert("Email password dalo")
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
    if(!entry) return alert("Write something")
    await fetch(API_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({text: entry, mood, user: email})
    })
    setEntry("")
    const res = await fetch(API_URL)
    const data = await res.json()
    setJournals(data)
  }

  return (
    <div style={{background: darkMode? "#1a1a2e" : "#e0f7fa", minHeight:"100vh", padding:"20px", fontFamily:"Arial"}}>

      {/* TOP BAR - Logout Light ke bazu me */}
      <div style={{maxWidth:"900px", margin:"0 auto 20px auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px"}}>
        <div style={{display:"flex", gap:"8px"}}>
          <button onClick={()=>setPage("home")} style={{padding:"8px 14px", borderRadius:"20px", border:"none", background:"white", fontWeight:"bold", cursor:"pointer"}}>🏠 Home</button>
          <button onClick={()=>setPage("learn")} style={{padding:"8px 14px", borderRadius:"20px", border:"none", background:"white", cursor:"pointer"}}>📚 Learn</button>
          <button onClick={()=>setPage("resources")} style={{padding:"8px 14px", borderRadius:"20px", border:"none", background:"white", cursor:"pointer"}}>🔗 Resources</button>
        </div>

        <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
          {user && <span style={{background:"white", padding:"8px 12px", borderRadius:"20px", fontSize:"12px"}}>👤 {user.split("@")[0]}</span>}
          <button onClick={()=>setDarkMode(!darkMode)} style={{padding:"8px 14px", borderRadius:"20px", border:"none", cursor:"pointer", background: darkMode? "white" : "#1a1a2e", color: darkMode? "black" : "white"}}>
            {darkMode? "☀️ Light" : "🌙 Dark"}
          </button>
          {user && <button onClick={handleLogout} style={{padding:"8px 14px", borderRadius:"20px", border:"none", background:"#ff6b6b", color:"white", fontWeight:"bold", cursor:"pointer"}}>Logout</button>}
        </div>
      </div>

      <div style={{maxWidth:"900px", margin:"0 auto"}}>
        {page==="home" && <Home setPage={setPage} user={user} darkMode={darkMode} />}
        {page==="learn" && <Learn darkMode={darkMode} />}
        {page==="resources" && <Resources darkMode={darkMode} />}

        {page==="login" && (
          <div style={{maxWidth:"450px", margin:"40px auto", background:"white", padding:"35px", borderRadius:"20px", textAlign:"center"}}>
            <h1 style={{marginBottom:"5px"}}>Welcome</h1>
            <p style={{color:"gray"}}>Please sign in to continue.</p>
            <div style={{display:"flex", background:"#f1f0f5", borderRadius:"12px", padding:"5px", margin:"20px 0"}}>
              <button style={{flex:1, padding:"10px", borderRadius:"8px", border:"none", background:"#7c5cff", color:"white", fontWeight:"bold"}}>User / Client</button>
              <button style={{flex:1, padding:"10px", border:"none", background:"transparent", color:"#666"}}>Therapist / Admin</button>
            </div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%", padding:"12px", borderRadius:"10px", border:"1px solid #ddd", marginBottom:"12px"}} />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:"12px", borderRadius:"10px", border:"2px solid #333", marginBottom:"15px"}} />
            <button onClick={handleLogin} style={{width:"100%", padding:"12px", borderRadius:"25px", border:"none", background:"#3f37c9", color:"white", fontWeight:"bold", cursor:"pointer"}}>Sign In as User</button>
            <p onClick={()=>setPage("home")} style={{marginTop:"15px", color:"#8a7cff", textDecoration:"underline", cursor:"pointer"}}>Cancel & Go Back</p>
          </div>
        )}

        {page==="journal" && (
          <div style={{background: darkMode? "#2d2d2d" : "white", padding:"25px", borderRadius:"15px", color: darkMode? "white" : "black"}}>
            <h2 style={{textAlign:"center"}}>Encrypted Journal 📝</h2>
            <select value={mood} onChange={e=>setMood(e.target.value)} style={{width:"100%", padding:"10px", margin:"15px 0", borderRadius:"8px"}}>
              <option>Happy 😊</option><option>Sad 😢</option><option>Anxious 😰</option><option>Energetic ⚡</option>
            </select>
            <textarea value={entry} onChange={e=>setEntry(e.target.value)} placeholder="How are you feeling today?" style={{width:"100%", height:"120px", padding:"12px", borderRadius:"10px"}} />
            <button onClick={handleSave} style={{width:"100%", padding:"12px", background:"#00acc1", color:"white", border:"none", borderRadius:"8px", marginTop:"10px", fontWeight:"bold", cursor:"pointer"}}>Save Entry</button>

            <div style={{marginTop:"20px"}}>
              <h3>Your Past Entries:</h3>
              {journals.slice(0,5).map((j,i)=><div key={i} style={{padding:"10px", background: darkMode?"#3a3a3a":"#f5f5f5", borderRadius:"8px", marginTop:"8px"}}>{j.mood} - {j.text}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
