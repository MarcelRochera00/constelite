import { useState, useEffect } from 'react'
import AddBookForm from './AddBookForm'   // 👈 nuevo
import ConstelationCanvas from './ConstelationCanvas'   // 👈 nuevo
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
    <div>
      <h1>Mis libros</h1>

      <AddBookForm onBookAdded={handleBookAdded} />  {/* 👈 nuevo */}
      <ConstelationCanvas></ConstelationCanvas>
      {error && <p>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} — {book.author?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App