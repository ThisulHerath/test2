import { EventBrowser } from './features/events/EventBrowser'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/">Campus Events</a>
        <span>Discover, learn, and connect.</span>
      </header>
      <EventBrowser />
    </main>
  )
}

export default App
