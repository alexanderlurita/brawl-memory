import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameProvider } from './contexts/game.jsx'
import { TimerProvider } from './contexts/timer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
  </GameProvider>,
)
