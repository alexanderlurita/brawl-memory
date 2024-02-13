import { useGameLogic } from '../hooks/useGameLogic'
import { useTimer } from '../hooks/useTimer'

export default function Controlers() {
  const { intents, resettingGame, resetGame } = useGameLogic()
  const { formatTime } = useTimer()

  return (
    <div className='controlers'>
      <button onClick={resetGame} disabled={resettingGame}>
        Reiniciar
      </button>
      <span>Tiempo: {formatTime()}</span>
      <h3>Intentos: {intents}</h3>
    </div>
  )
}
