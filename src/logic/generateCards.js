import { BRAWLERS } from '../constants/game'
import { getRandomBackground } from '../utils'

export function generateCards() {
  const elements = Object.values(BRAWLERS)
  const duplicates = elements.flatMap((element) => [element, element])

  const shuffled = duplicates
    .sort(() => Math.random() - 0.5)
    .map((el, index) => {
      const bgColor = getRandomBackground()
      return {
        uid: index,
        image: el,
        bgColor,
        isMatched: false,
        isSelected: false
      }
    })

  return shuffled
}
