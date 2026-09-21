import { useState, useEffect } from 'react'
import AddBookForm from './AddBookForm'   // 👈 nuevo
import ConstellationCanvas from './ConstellationCanvas'   // 👈 nuevo
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => setError(err.message))
  }, [])

  const handleBookAdded = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook])
  }

  if (error) return <p>Error: {error}</p>

  return (
    <div className="app-container">
      <div className="app-title">CONSTELITE</div>
      <div className="constellation-canvas-wrapper">
        <ConstellationCanvas className="constellation-canvas"></ConstellationCanvas>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default App