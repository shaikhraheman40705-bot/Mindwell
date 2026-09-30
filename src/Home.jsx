export default function Home({ setPage, user, darkMode }) {
  return (
    <div style={{background: darkMode? "#2d2d2d":"white", padding:"40px", borderRadius:"20px", textAlign:"center", color: darkMode?"white":"black"}}>
      <h1 style={{fontSize:"48px"}}>Welcome to MindWell 👋</h1>
      <p style={{color:"gray"}}>Your personal mental wellness companion.</p>
      <button onClick={()=> user? setPage("journal") : setPage("login")} style={{marginTop:"20px", padding:"15px 40px", background:"#00acc1", color:"white", border:"none", borderRadius:"30px", fontWeight:"bold"}}>Get Started →</button>
      <p style={{marginTop:"30px", color:"gray", fontSize:"13px"}}>© 2026 MindWell | Created by Rahema Shaikh</p>
    </div>
  )
}
