export const getMoodColor = (m) => {
  if(m === "Happy") return "#22c55e"
  if(m === "Sad") return "#3b82f6"
  if(m === "Anxious") return "#f97316"
  return "#6366f1"
}

export const getMoodEmoji = (m) => {
  if(m === "Happy") return "😊"
  if(m === "Sad") return "😔"
  if(m === "Anxious") return "😰"
  return "📝"
}