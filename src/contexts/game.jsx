import { createContext, useState } from 'react'
import { generateCards } from '../utils/generateCards'

export const GameContext = createContext()

export function GameProvider({ children }) {
  const [cards, setCards] = useState(generateCards)
  const [selectedCards, setSelectedCards] = useState(new Array(2).fill(null))
  const [isComparing, setIsComparing] = useState(false)
  const [allCardsPaired, setAllCardsPaired] = useState(false)
  const [intents, setIntents] = useState(0)

  return (
    <GameContext.Provider
      value={{
        cards,
        setCards,
        selectedCards,
        setSelectedCards,
        isComparing,
        setIsComparing,
        allCardsPaired,
        setAllCardsPaired,
        intents,
        setIntents,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
