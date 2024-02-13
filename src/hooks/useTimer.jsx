import { useContext } from 'react'
import { TimerContext } from '../contexts/timer'

export function useTimer() {
  const {
    seconds: time,
    setSeconds,
    isRunning,
    setIsRunning,
  } = useContext(TimerContext)

  const formatTime = () => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    const formattedHours = String(hours).padStart(2, '0')
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return { isRunning, formatTime, toggleTimer, resetTimer }
}
