import FlipCard from 'reactjs-flip-card'
import { useGameLogic } from '../../hooks/useGameLogic'
import StarrDropImage from './StarrDropImage'
import BrawlerImage from './BrawlerImage'
import { getCardFlipStyles } from '../../utils'

export default function BrawlerCard({
  uid,
  image,
  isMatched,
  isSelected,
  bgColor,
}) {
  const { isComparing, handleCardSelection } = useGameLogic()

  const flipTrigger = isMatched || isComparing ? 'disabled' : 'onClick'
  const flipByProp = isMatched || isSelected

  const cardStyles = {
    flipCard: { width: 150, cursor: 'pointer' },
    front: getCardFlipStyles({ hexColor: bgColor }),
    back: getCardFlipStyles({ hexColor: '#FFB36D' }),
  }

  return (
    <FlipCard
      flipTrigger={flipTrigger}
      flipByProp={flipByProp}
      flipCardCss='card'
      flipCardStyle={cardStyles.flipCard}
      frontStyle={cardStyles.front}
      backStyle={cardStyles.back}
      frontComponent={<StarrDropImage />}
      backComponent={<BrawlerImage image={image} />}
      onClick={() => handleCardSelection(uid)}
    />
  )
}
