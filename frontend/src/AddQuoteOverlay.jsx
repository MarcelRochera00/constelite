import { useState } from 'react'

function AddQuoteOverlay({ books, onQuoteAdded, onClose }) {
  const [text, setText] = useState('')
  const [bookId, setBookId] = useState('')
  const [themes, setThemes] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

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
        setBookId('')
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
        <input value={bookId} onChange={e => setBookId(e.target.value)} placeholder="ID del libro" />
        <input value={themes} onChange={e => setThemes(e.target.value)} placeholder="Temas" />
        <button type="submit">Añadir quote</button>
        <button type="button" onClick={onClose}>Cerrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default AddQuoteOverlay