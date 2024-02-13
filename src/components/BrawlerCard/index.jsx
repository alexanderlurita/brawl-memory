import FlipCard from 'reactjs-flip-card'
import { useGameLogic } from '../../hooks/useGameLogic'
import { CARD_FLIP_STYLES } from '../../constants/styles'
import StarrDropImage from './StarrDropImage'
import BrawlerImage from './BrawlerImage'

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
    front: {
      ...CARD_FLIP_STYLES,

      background: `
        repeating-radial-gradient(
          circle, 
          rgba(255, 255, 255, 0.3) 20%, 
          rgba(255, 255, 255, 0) 100%), 
          ${bgColor}
      `,
    },
    back: { ...CARD_FLIP_STYLES, background: '#FFB36D' },
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
