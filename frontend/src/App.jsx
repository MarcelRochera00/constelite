import { useState, useEffect } from 'react'
import AddBookForm from './AddBookForm'
import AddQuoteOverlay from './AddQuoteOverlay'
import ConstellationCanvas from './ConstellationCanvas'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const [activeOverlay, setActiveOverlay] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => setError(err.message))
  }, [])

  const handleBookAdded = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook])
  }

  const handleQuoteAdded = (newQuote) => {
    console.log('Quote añadida:', newQuote)
  }

  const clickAddQuote = () => {
    setActiveOverlay('addQuote')
  }

  if (error) return <p>Error: {error}</p>

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">CONSTELITE</h1>
      </div>

      <div className="constellation-canvas-wrapper">
        <ConstellationCanvas className="constellation-canvas"></ConstellationCanvas>
      </div>

      <button className="add-quote-button" onClick={clickAddQuote}>
        + AÑADIR QUOTE
      </button>

      {activeOverlay === 'addQuote' && (
        <AddQuoteOverlay
          books={books}
          onQuoteAdded={handleQuoteAdded}
          onClose={() => setActiveOverlay(null)}
        />
      )}
    </div>
  )
}

export default App