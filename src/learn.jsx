export default function Learn({ darkMode }) {
  return (
    <div style={{background: darkMode? "#2d2d2d":"white", padding:"30px", borderRadius:"20px", color: darkMode?"white":"black"}}>
      <h1>📚 Learn</h1>
      <p>1. What is Anxiety? - Body's natural response to stress.</p>
      <p>2. Power of Journaling - Track mood daily.</p>
      <p>3. Breathing 4-7-8 Technique - Inhale 4, Hold 7, Exhale 8.</p>
    </div>
  )
}
