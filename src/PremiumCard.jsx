export default function PremiumCard({ darkMode }) {
  return (
    <div style={{background: darkMode ? '#2d2d2d' : 'white', padding:'20px', borderRadius:'15px', marginTop:'20px', border:'2px dashed #FFC107', textAlign:'center'}}>
      <h3>⭐ MindWell Premium</h3>
      <p style={{fontSize:'14px', color: darkMode ? '#aaa' : '#666'}}>Unlock AI Insights, Cloud Backup & Unlimited History</p>
      <div style={{filter:'blur(5px)', background:'#f5f5f5', padding:'10px', borderRadius:'8px', margin:'10px 0'}}>
        <p>🤖 AI says: You are most Happy on Mondays!</p>
      </div>
      <button style={{padding:'10px 20px', background:'#FFC107', border:'none', borderRadius:'20px', fontWeight:'bold', cursor:'pointer'}}>
        Upgrade for ₹199/mo
      </button>
    </div>
  )
}