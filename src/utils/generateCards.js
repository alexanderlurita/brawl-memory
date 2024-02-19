import { BRAWLERS } from '../constants/game'
import { getRandomBackground } from '.'

const allowedFormats = {
  '4x4': 16,
  '6x6': 36,
  '8x8': 64,
}

export function generateCards({ format } = {}) {
  if (!Object.keys(allowedFormats).includes(format))
    throw new Error('Format must be one of: 4x4, 6x6, 8x8')

  const elements = Object.values(BRAWLERS).slice(0, allowedFormats[format] / 2)
  const duplicates = elements.flatMap((element) => [element, element])

  const shuffled = duplicates
    .sort(() => Math.random() - 0.5)
    .map((el, index) => {
      const bgColor = getRandomBackground()
      return {
        uid: index,
        image: el,
        isMatched: false,
        isSelected: false,
        bgColor,
      }
    })

  return shuffled
}
