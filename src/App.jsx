import { useState } from 'react'

function App() {
  const [userType, setUserType] = useState("user")
  const [email, setEmail] = useState("shaikhraheman40705@gmail.com")
  const [password, setPassword] = useState("")

  const handleSignIn = () => {
    if(!email || !password) {
      alert("Please enter email and password")
      return
    }
    alert(`Signed in as ${userType}: ${email}`)
    
  }

  return (
    <div style={{minHeight:"100vh", background:"#f8f9ff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:"Arial"}}>
      
      <div style={{background:"white", padding:"40px 35px", borderRadius:"20px", width:"100%", maxWidth:"450px", boxShadow:"0 10px 30px rgba(0,0,0,0.08)", textAlign:"center"}}>
        
        <h1 style={{fontSize:"32px", fontWeight:"bold", marginBottom:"8px", color:"#111"}}>Welcome</h1>
        <p style={{color:"#888", marginBottom:"25px", fontSize:"15px"}}>Please sign in to continue.</p>

        {/* User / Therapist Toggle */}
        <div style={{display:"flex", background:"#f1f0f5", borderRadius:"12px", padding:"5px", marginBottom:"25px"}}>
          <button 
            onClick={()=>setUserType("user")}
            style={{
              flex:1, 
              padding:"12px", 
              borderRadius:"8px", 
              border:"none", 
              fontWeight:"bold", 
              cursor:"pointer",
              background: userType==="user" ? "#7c5cff" : "transparent",
              color: userType==="user" ? "white" : "#666",
              transition:"0.2s"
            }}
          >
            User / Client
          </button>
          <button 
            onClick={()=>setUserType("therapist")}
            style={{
              flex:1, 
              padding:"12px", 
              borderRadius:"8px", 
              border:"none", 
              fontWeight:"bold", 
              cursor:"pointer",
              background: userType==="therapist" ? "#7c5cff" : "transparent",
              color: userType==="therapist" ? "white" : "#666",
              transition:"0.2s"
            }}
          >
            Therapist / Admin
          </button>
        </div>

        {/* Email */}
        <input 
          type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          style={{width:"100%", padding:"14px 15px", borderRadius:"10px", border:"1px solid #e0e0e0", background:"#f7f7fb", marginBottom:"15px", fontSize:"14px", boxSizing:"border-box"}}
        />

        {/* Password */}
        <input 
          type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          style={{width:"100%", padding:"14px 15px", borderRadius:"10px", border:"2px solid #333", background:"white", marginBottom:"20px", fontSize:"14px", boxSizing:"border-box"}}
        />

        {/* Sign In Button */}
        <button 
          onClick={handleSignIn}
          style={{width:"100%", padding:"14px", borderRadius:"25px", border:"none", background:"#3f37c9", color:"white", fontWeight:"bold", fontSize:"16px", cursor:"pointer", marginBottom:"20px"}}
        >
          Sign In as {userType==="user" ? "User" : "Therapist"}
        </button>

        <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
          <a href="#" style={{color:"#8a7cff", fontSize:"14px", textDecoration:"underline"}}>Need an account? Sign Up</a>
          <a href="#" style={{color:"#555", fontSize:"14px", textDecoration:"underline"}}>Cancel & Go Back</a>
        </div>

      </div>

      <p style={{marginTop:"30px", fontSize:"13px", color:"#888"}}>© 2026 MindWell - Created by Rahema Shaikh</p>
    </div>
  )
}

export default App
