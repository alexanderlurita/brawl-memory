import { STARR_DROPS_BACKGROUND } from '../constants/game'

export function getRandomBackground() {
  const keys = Object.keys(STARR_DROPS_BACKGROUND)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return STARR_DROPS_BACKGROUND[randomKey]
}
