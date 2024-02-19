import { createContext, useEffect, useState } from 'react'
import { generateCards } from '../utils/generateCards'
import { difficulties } from '../constants/game'

export const GameContext = createContext()

export function GameProvider({ children }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [cards, setCards] = useState(null)
  const [selectedCards, setSelectedCards] = useState(new Array(2).fill(null))
  const [isComparing, setIsComparing] = useState(false)
  const [allCardsPaired, setAllCardsPaired] = useState(false)
  const [intents, setIntents] = useState(0)
  const [resettingGame, setResettingGame] = useState(false)

  useEffect(() => {
    if (selectedDifficulty) {
      setCards(() =>
        generateCards({ format: difficulties[selectedDifficulty].format }),
      )
    }
  }, [selectedDifficulty])

  useEffect(() => {
    if (allCardsPaired) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [allCardsPaired])

  return (
    <GameContext.Provider
      value={{
        selectedDifficulty,
        setSelectedDifficulty,
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
        resettingGame,
        setResettingGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
