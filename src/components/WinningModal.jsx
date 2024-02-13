import { useGameLogic } from '../hooks/useGameLogic'
import { useTimer } from '../hooks/useTimer'

export default function WinningModal() {
  const { allCardsPaired, intents, resetGame } = useGameLogic()
  const { formatTime } = useTimer()

  if (!allCardsPaired) return null

  return (
    <div className='winning-modal'>
      <div className='winning-modal-content'>
        <img
          className='winning-modal-image'
          src='/images/starr_pin_special.png'
          alt='Starr pin special'
        />
        <h2 className='winning-modal-title'>¡Ganaste!</h2>
        <p className='winning-modal-text'>
          Felicidades, has emparejado todas las cartas.
        </p>
        <p className='winning-modal-information'>
          <span className='duration'>Duración: {formatTime()}</span>
          <span className='intents'>N° intentos: {intents}</span>
        </p>
        <button className='winning-modal-button' onClick={resetGame}>
          Nueva partida
        </button>
      </div>
    </div>
  )
}
