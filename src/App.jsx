import Controlers from './components/Controlers'
import WinningModal from './components/WinningModal'
import ShowdownArena from './components/ShowdownArena'
import './App.css'

export default function App() {
  return (
    <main className='container'>
      <h1>Brawl Memory</h1>

      <Controlers />

      <ShowdownArena />

      <WinningModal />
    </main>
  )
}
