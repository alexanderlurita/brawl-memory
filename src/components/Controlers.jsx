import { useGameLogic } from '../hooks/useGameLogic'

export default function Controlers() {
  const { intents, resetGame } = useGameLogic()

  return (
    <div className='controlers'>
      <button onClick={resetGame}>Reiniciar</button>
      <h3>Intentos: {intents}</h3>
    </div>
  )
}
