import Controllers from './components/Controllers'
import WinningModal from './components/WinningModal'
import ShowdownArena from './components/ShowdownArena'
import DifficultyPicker from './components/DifficultyPicker'
import './App.css'

export default function App() {
  return (
    <main className='container'>
      <h1>Brawl Memory</h1>

      <Controllers />

      <ShowdownArena />

      <DifficultyPicker />

      <WinningModal />
    </main>
  )
}
