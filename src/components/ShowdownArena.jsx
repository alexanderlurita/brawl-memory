import { difficulties } from '../constants/game'
import { useGameLogic } from '../hooks/useGameLogic'
import BrawlerCard from './BrawlerCard'

export default function ShowdownArena() {
  const { selectedDifficulty, cards } = useGameLogic()

  if (!selectedDifficulty) return null

  const stylesGame = {
    gridTemplateColumns: `repeat(${difficulties[
      selectedDifficulty
    ].format.charAt(0)}, minmax(150px, 1fr))`,
  }

  return (
    <div className='game' style={stylesGame}>
      {cards?.map(({ uid, image, isMatched, isSelected, bgColor }) => (
        <BrawlerCard
          key={uid}
          uid={uid}
          image={image}
          isMatched={isMatched}
          isSelected={isSelected}
          bgColor={bgColor}
        />
      ))}
    </div>
  )
}
