import { useState } from 'react'
import './App.css'
import FlipCard from 'reactjs-flip-card'
import { generateCards } from './logic/generateCards'
import { CARD_FLIP_STYLES } from './constants/styles'
import confetti from 'canvas-confetti'

export default function App() {
  const [cards, setCards] = useState(generateCards)
  const [selectedCards, setSelectedCards] = useState(new Array(2).fill(null))
  const [isComparing, setIsComparing] = useState(false)
  const [intents, setIntents] = useState(0)
  const [allCardsPaired, setAllCardsPaired] = useState(false)

  const handleCardFlip = (uid) => {
    let newSelectedCards = [...selectedCards]
    let [firstCard, secondCard] = newSelectedCards

    if (firstCard?.uid === uid || secondCard?.uid === uid) return

    if (isComparing && !firstCard && !secondCard) return

    const newCards = [...cards]
    const isCardMatched = newCards.find((card) => card.uid === uid).isMatched

    if (isCardMatched) return

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
          : card
      )

      newSelectedCards = [null, null]

      setTimeout(() => {
        setCards(updatedCards)
        setIntents((prevIntents) => prevIntents + 1)
        setIsComparing(false)

        const result = checkAllCardsPaired(updatedCards)
        if (result) {
          setAllCardsPaired(result)
          confetti()
        }
      }, 1500)
    } else if (firstCard && secondCard && !areSameCards) {
      const updatedCards = newCards.map((card) =>
        card.uid === firstCard.uid || card.uid === secondCard.uid
          ? { ...card, isSelected: false }
          : card
      )

      newSelectedCards = [null, null]

      setTimeout(() => {
        setCards(updatedCards)
        setIntents((prevIntents) => prevIntents + 1)
        setIsComparing(false)
      }, 1500)
    } else {
      setIsComparing(true)
    }

    setSelectedCards(newSelectedCards)
  }

  const resetGame = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        isMatched: false,
        isSelected: false
      }))
    )
    setTimeout(() => {
      setCards(generateCards)
      setSelectedCards(new Array(2).fill(null))
      setIsComparing(false)
      setIntents(0)
      setAllCardsPaired(false)
    }, 500)
  }

  const checkAllCardsPaired = (cards) => cards.every((card) => card.isMatched)

  return (
    <main className='container'>
      <h1>Brawl Memory</h1>
      <div className='controlers'>
        <button onClick={resetGame}>Reiniciar</button>
        <h3>Intentos: {intents}</h3>
      </div>
      <div className='game'>
        {cards.map(({ uid, image, isMatched, isSelected, bgColor }) => (
          <FlipCard
            key={uid}
            flipTrigger={isMatched || isComparing ? 'disabled' : 'onClick'}
            flipByProp={isMatched || isSelected}
            flipCardCss='card'
            flipCardStyle={{ width: 150 }}
            frontStyle={{
              ...CARD_FLIP_STYLES,
              background: bgColor
            }}
            backStyle={{
              ...CARD_FLIP_STYLES,
              background: '#FFB36D'
            }}
            frontComponent={
              <img src='/images/starr_drop.png' alt='StarrDrop' />
            }
            backComponent={
              <img
                src={`/images/${image}`}
                alt={`Brawler ${image.replace('.png', '')}`}
              />
            }
            onClick={() => handleCardFlip(uid)}
          />
        ))}
      </div>

      {allCardsPaired && (
        <div className='winning-modal'>
          <div className='winning-modal-content'>
            <img
              className='winning-modal-image'
              src='/images/starr_pin_special.png'
              alt='Starr pin special'
            />
            <h2 className='winning-modal-title'>¡Ganaste!</h2>
            <p className='winning-modal-text'>
              Felicidades, has emparejado todas las cartas.
            </p>
            <p className='intents'>N° intentos: {intents}</p>
            <button className='winning-modal-button' onClick={resetGame}>
              Nueva partida
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
