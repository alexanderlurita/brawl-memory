import { useGameLogic } from '../hooks/useGameLogic'
import BrawlerCard from './BrawlerCard'

export default function ShowdownArena() {
  const { cards } = useGameLogic()

  return (
    <div className='game'>
      {cards.map(({ uid, image, isMatched, isSelected, bgColor }) => (
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
