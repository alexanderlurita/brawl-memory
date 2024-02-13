import { useGameLogic } from '../hooks/useGameLogic'
import { useTimer } from '../hooks/useTimer'

export default function Controlers() {
  const { intents, resetGame } = useGameLogic()
  const { formatTime } = useTimer()

  return (
    <div className='controlers'>
      <button onClick={resetGame}>Reiniciar</button>
      <p>Tiempo: {formatTime()}</p>
      <h3>Intentos: {intents}</h3>
    </div>
  )
}
