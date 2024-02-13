import { STARR_DROPS_BACKGROUND } from '../constants/game'
import { CARD_FLIP_BASE_STYLES } from '../constants/styles'

export function getRandomBackground() {
  const keys = Object.keys(STARR_DROPS_BACKGROUND)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return STARR_DROPS_BACKGROUND[randomKey]
}

export function getCardFlipStyles({ hexColor, ...otherStyles }) {
  return {
    ...CARD_FLIP_BASE_STYLES,
    background: `
      repeating-radial-gradient(
        circle, 
        rgba(255, 255, 255, 0.3) 20%, 
        rgba(255, 255, 255, 0) 100%), 
        ${hexColor}
      `,
    ...otherStyles,
  }
}
