export default function Learn({ darkMode }) {
  const topics = [
    { icon: "🧠", title: "What is Anxiety?", desc: "Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension. Learn how to identify triggers and manage it with simple grounding techniques.", color: "#e0f2fe" },
    { icon: "✍️", title: "Power of Journaling", desc: "Writing down your thoughts helps you clear your mind. 10 minutes of daily journaling can reduce stress by 28% and improve your mood tracking.", color: "#fce7f3" },
    { icon: "🌬️", title: "4-7-8 Breathing", desc: "Inhale for 4 seconds, Hold for 7 seconds, Exhale for 8 seconds. This technique is a natural tranquilizer for your nervous system. Try it in Breathe section.", color: "#dcfce7" },
    { icon: "😴", title: "Sleep & Mental Health", desc: "Poor sleep directly affects mental health. Maintain a fixed sleep schedule, avoid screens 1 hour before bed, and keep your room dark.", color: "#fef9c3" },
    { icon: "💜", title: "Self-Care Routine", desc: "Self-care is not selfish. 5 min meditation, drinking water, walking, and talking to a friend are powerful self-care tools.", color: "#ede9fe" },
  ]

  return (
    <div style={{background:"white", padding:"30px", borderRadius:"20px", boxShadow:"0 10px 30px rgba(0,0,0,0.05)"}}>
      <h1 style={{fontSize:"32px", fontWeight:"800", marginBottom:"5px"}}>📚 Learn & Grow</h1>
      <p style={{color:"#888", marginBottom:"25px"}}>Understand your mind better with curated topics.</p>
      
      <div style={{display:"grid", gap:"15px"}}>
        {topics.map((t,i)=>(
          <div key={i} style={{background: t.color, padding:"18px", borderRadius:"15px", display:"flex", gap:"15px", alignItems:"flex-start"}}>
            <div style={{fontSize:"28px", background:"white", width:"50px", height:"50px", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"12px"}}>{t.icon}</div>
            <div>
              <h3 style={{margin:"0 0 5px 0", fontSize:"16px", fontWeight:"bold"}}>{t.title}</h3>
              <p style={{margin:0, fontSize:"13px", color:"#555", lineHeight:"1.5"}}>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:"25px", background:"#f8f9ff", padding:"15px", borderRadius:"12px", textAlign:"center", border:"1px dashed #7c5cff"}}>
        <p style={{fontSize:"13px", color:"#7c5cff", fontWeight:"bold"}}>✨ New article every week! Stay tuned.</p>
      </div>
    </div>
  )
}
