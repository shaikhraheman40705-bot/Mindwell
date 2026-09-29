import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const moodValues = { Happy: 8, Excited: 9, Neutral: 5, Sad: 3, Anxious: 4, Angry: 2, Energetic: 7 };

export default function MoodChart({ entries, darkMode }) {
  if (!entries || entries.length === 0) {
    return (
      <div style={{background: darkMode? '#2d2d2d' : 'white', padding:'20px', borderRadius:'12px', marginTop:'20px', textAlign:'center', color: darkMode? '#aaa' : '#666'}}>
        No mood data yet. Start journaling to see your journey!
      </div>
    );
  }

  // Latest entry right side pe aaye isliye reverse kiya
  const reversed = [...entries].reverse();
  const labels = reversed.map(e => new Date(e.date || e.createdAt).toLocaleDateString('en-IN', {month:'short', day:'numeric'}));
  const dataPoints = reversed.map(e => moodValues[e.mood] || 5);

  const data = {
    labels,
    datasets: [{
      label: 'Mood (1-10)',
      data: dataPoints,
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.25)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#8b5cf6',
      pointRadius: 5,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: darkMode? 'white' : 'black' } },
      title: { display: true, text: 'Your Emotional Journey (Last 7 Entries)', color: darkMode? 'white' : 'black', font:{size:16} },
    },
    scales: {
      y: { min: 0, max: 10, ticks:{color: darkMode? '#aaa' : '#666'}, grid:{color: darkMode? '#444' : '#eee'} },
      x: { ticks:{color: darkMode? '#aaa' : '#666'}, grid:{color: darkMode? '#444' : '#eee'} }
    }
  };

  return <div style={{background: darkMode? '#2d2d2d' : 'white', padding:'20px', borderRadius:'12px', marginTop:'20px', boxShadow:'0 4px 10px rgba(0,0,0,0.1)'}}><Line options={options} data={data} /></div>;
}