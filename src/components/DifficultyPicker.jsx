import { difficulties } from '../constants/game'
import { useGameLogic } from '../hooks/useGameLogic'

export default function DifficultyPicker() {
  const { selectedDifficulty, handleDifficultySelection } = useGameLogic()

  if (selectedDifficulty) return null

  return (
    <div className='memory-setup-container'>
      <div className='memory-setup-content'>
        <img
          className='memory-setup-image'
          src='/images/starr_pin_happy.png'
          alt='Starr pin special'
        />
        <h1>¡Bienvenido a Brawl Memory!</h1>
        <p>Por favor seleccione el nivel de dificultad:</p>
        <div className='memory-buttons-levels'>
          {Object.keys(difficulties).map((key) => (
            <button key={key} onClick={() => handleDifficultySelection(key)}>
              {difficulties[key].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
