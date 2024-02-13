import FlipCard from 'reactjs-flip-card'
import { useGameLogic } from '../hooks/useGameLogic'
import { CARD_FLIP_STYLES } from '../constants/styles'

function StarrDropImage() {
  return (
    <img className='starr-drop' src='/images/starr_drop.png' alt='StarrDrop' />
  )
}

function BrawlerImage({ image }) {
  return (
    <img
      className='brawler'
      src={`/images/${image}`}
      alt={`Brawler ${image.replace('.png', '')}`}
    />
  )
}

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
    flipCard: { width: 150 },
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
