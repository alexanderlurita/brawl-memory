import { createContext, useEffect, useState } from 'react'

export const TimerContext = createContext()

export function TimerProvider({ children }) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    } else {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isRunning])

  return (
    <TimerContext.Provider
      value={{
        seconds,
        setSeconds,
        isRunning,
        setIsRunning,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
