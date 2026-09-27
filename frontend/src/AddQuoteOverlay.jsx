import { useState } from 'react'

function AddQuoteOverlay({ books, onQuoteAdded, onClose }) {
  const [text, setText] = useState('')
  const [bookQuery, setBookQuery] = useState('')
  const [bookId, setBookId] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [themes, setThemes] = useState('')
  const [error, setError] = useState(null)

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(bookQuery.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!bookId) {
      setError('Selecciona un libro de la lista')
      return
    }

    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quote: { text, book_id: bookId, themes }
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar la quote')
        return res.json()
      })
      .then(newQuote => {
        onQuoteAdded(newQuote)
        setText('')
        setBookQuery('')
        setBookId(null)
        setThemes('')
        onClose()
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className="addQuoteOverlay">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Quote"
          rows={3}
        />

        <div className="book-search">
          <input
            value={bookQuery}
            onChange={e => {
              setBookQuery(e.target.value)
              setBookId(null)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Book title"
          />

          {showSuggestions && bookQuery && filteredBooks.length > 0 && (
            <ul className="book-suggestions">
              {filteredBooks.map(book => (
                <li
                  key={book.id}
                  onClick={() => {
                    setBookQuery(book.title)
                    setBookId(book.id)
                    setShowSuggestions(false)
                  }}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input value={themes} onChange={e => setThemes(e.target.value)} placeholder="Themes" />
        <button type="submit">Add quote</button>
        <button type="button" onClick={onClose}>Cerrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default AddQuoteOverlay