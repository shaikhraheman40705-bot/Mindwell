import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BreathingExercise({ darkMode }) {
  const [phase, setPhase] = useState('Inhale')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return
    const durations = { Inhale: 4000, Hold: 7000, Exhale: 8000 }
    const nextPhase = { Inhale: 'Hold', Hold: 'Exhale', Exhale: 'Inhale' }

    const timeout = setTimeout(() => {
      setPhase(nextPhase[phase])
    }, durations[phase])

    return () => clearTimeout(timeout)
  }, [phase, isActive])

  const getScale = () => {
    if (!isActive) return 1
    return phase === 'Exhale'? 1 : 1.6 // Inhale/Hold pe bada, Exhale pe chhota
  }

  const getColor = () => {
    if (phase === 'Inhale') return '#66bb6a' // Green - calm
    if (phase === 'Hold') return '#ffca28' // Yellow - focus
    return '#4db6ac' // Teal - relax
  }

  return (
    <div style={{background: darkMode? '#2d2d2d' : 'white', padding:'25px', borderRadius:'15px', textAlign:'center', marginBottom:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', border: darkMode? '1px solid #444' : '1px solid #eee'}}>
      <h3 style={{color: darkMode? 'white' : '#1a1a2e', marginBottom:'5px'}}>🧘 Breathing Assistant</h3>
      <p style={{color: darkMode? '#aaa' : '#666', fontSize:'14px', marginBottom:'10px'}}>
        {isActive? `${phase} - ${phase==='Inhale'?'4s':phase==='Hold'?'7s':'8s'}` : '4-7-8 Technique to reduce stress'}
      </p>

      <motion.div
        animate={{ scale: getScale(), backgroundColor: isActive? getColor() : '#90a4ae' }}
        transition={{ duration: phase === 'Inhale'? 4 : phase === 'Exhale'? 8 : 0.3, ease: "easeInOut" }}
        style={{
          width:'130px', height:'130px', margin:'30px auto',
          borderRadius:'50%',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'white', fontWeight:'bold', fontSize:'20px',
          boxShadow: `0 0 30px ${getColor()}60`
        }}
      >
        {isActive? phase : 'Breathe'}
      </motion.div>

      <button onClick={()=>{setIsActive(!isActive); if(!isActive) setPhase('Inhale')}} style={{padding:'10px 25px', borderRadius:'25px', border:'none', background: isActive? '#ef5350' : '#26a69a', color:'white', cursor:'pointer', fontWeight:'bold', transition:'0.2s'}}>
        {isActive? 'Stop Session' : 'Start Breathing'}
      </button>
    </div>
  )
}