import { useContext } from 'react'
import { GameContext } from '../contexts/game'
import { generateCards } from '../utils/generateCards'
import confetti from 'canvas-confetti'
import { useTimer } from './useTimer'

export function useGameLogic() {
  const {
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
  } = useContext(GameContext)
  const { isRunning, toggleTimer, resetTimer } = useTimer()

  const updateSelectedCards = (newSelectedCards) => {
    setSelectedCards(newSelectedCards)
  }

  const updateCards = (updatedCards, callback) => {
    setTimeout(() => {
      setCards(updatedCards)
      setIsComparing(false)
      setIntents((prevIntents) => prevIntents + 1)

      const result = callback ? callback(updatedCards) : null

      if (result) {
        setAllCardsPaired(result)
        toggleTimer()
        confetti()
      }
    }, 1000)
  }

  const handleMatchingCards = (updatedCards) => {
    updateSelectedCards([null, null])
    updateCards(updatedCards, checkAllCardsPaired)
  }

  const handleNonMatchingCards = (updatedCards) => {
    updateSelectedCards([null, null])
    updateCards(updatedCards)
  }

  const handleCardSelection = (uid) => {
    // Empieza el cronómetro al primer click sobre una card
    if (!isRunning) toggleTimer()

    let newSelectedCards = [...selectedCards]
    let [firstCard, secondCard] = newSelectedCards

    if (firstCard?.uid === uid || secondCard?.uid === uid) return

    if (isComparing && !firstCard && !secondCard) return

    const newCards = [...cards]
    const selectedCard = newCards.find((card) => card.uid === uid)

    if (selectedCard.isMatched) return

    let areSameCards

    if (!firstCard) {
      newCards[uid].isSelected = true
      firstCard = { ...newCards[uid] }
    } else if (!secondCard) {
      newCards[uid].isSelected = true
      secondCard = { ...newCards[uid] }
    }

    if (firstCard && secondCard) {
      areSameCards = firstCard.image === secondCard.image
      firstCard.isMatched = areSameCards
      secondCard.isMatched = areSameCards
    }

    newSelectedCards = [firstCard, secondCard]

    if (areSameCards) {
      const updatedCards = newCards.map((card) =>
        card.image === firstCard.image
          ? { ...card, isMatched: true, isSelected: false }
          : card,
      )

      handleMatchingCards(updatedCards)
    } else if (firstCard && secondCard && !areSameCards) {
      const updatedCards = newCards.map((card) =>
        card.uid === firstCard.uid || card.uid === secondCard.uid
          ? { ...card, isSelected: false }
          : card,
      )

      handleNonMatchingCards(updatedCards)
    } else {
      setIsComparing(true)
      updateSelectedCards(newSelectedCards)
    }
  }

  const checkAllCardsPaired = (cards) => cards.every((card) => card.isMatched)

  const resetGame = () => {
    if (resettingGame) return

    setResettingGame(true)

    // Primero quitamos el modal
    setAllCardsPaired(false)

    // Segundo ocultamos todas las cartas
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        isMatched: false,
        isSelected: false,
      })),
    )

    // Tercero esperamos 500ms para volver a generar nuevas cartas
    // así evitamos que se vean mientras se ocultan
    setTimeout(() => {
      setCards(generateCards)
      setSelectedCards([null, null])
      setIsComparing(false)
      setIntents(0)
      resetTimer()
    }, 500)

    setTimeout(() => setResettingGame(false), 3000)
  }

  return {
    cards,
    selectedCards,
    isComparing,
    allCardsPaired,
    intents,
    resettingGame,
    handleCardSelection,
    checkAllCardsPaired,
    resetGame,
  }
}
