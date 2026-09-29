import { useState } from 'react'

function AddQuoteOverlay({ books, authors, onQuoteAdded, onClose }) {
  const [text, setText] = useState('')
  const [themes, setThemes] = useState('')
  const [error, setError] = useState(null)

  // Book
  const [bookQuery, setBookQuery] = useState('')
  const [bookId, setBookId] = useState(null)
  const [showBookSuggestions, setShowBookSuggestions] = useState(false)
  const [creatingNewBook, setCreatingNewBook] = useState(false)

  // Author
  const [authorQuery, setAuthorQuery] = useState('')
  const [authorId, setAuthorId] = useState(null)
  const [showAuthorSuggestions, setShowAuthorSuggestions] = useState(false)

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(bookQuery.toLowerCase())
  )

  const filteredAuthors = authors.filter(a =>
    a.name.toLowerCase().includes(authorQuery.toLowerCase())
  )

  const resetForm = () => {
    setText('')
    setThemes('')
    setBookQuery('')
    setBookId(null)
    setCreatingNewBook(false)
    setAuthorQuery('')
    setAuthorId(null)
  }

  const submitQuote = (finalBookId) => {
    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quote: { text, book_id: finalBookId, themes } })
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar la quote')
        return res.json()
      })
      .then(newQuote => {
        onQuoteAdded(newQuote)
        resetForm()
        onClose()
      })
      .catch(err => setError(err.message))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (creatingNewBook) {
      const authorPromise = authorId
        ? Promise.resolve({ id: authorId })
        : fetch('http://localhost:3000/authors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: { name: authorQuery.trim() } })
          }).then(res => {
            if (!res.ok) throw new Error('Error al crear autor')
            return res.json()
          })

      authorPromise
        .then(author =>
          fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ book: { title: bookQuery, author_id: author.id, themes } })
          })
        )
        .then(res => {
          if (!res.ok) throw new Error('Error al crear libro')
          return res.json()
        })
        .then(newBook => submitQuote(newBook.id))
        .catch(err => setError(err.message))

    } else {
      if (!bookId) {
        setError('Selecciona un libro de la lista')
        return
      }
      submitQuote(bookId)
    }
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
              setShowBookSuggestions(true)
            }}
            onFocus={() => setShowBookSuggestions(true)}
            placeholder="Título del libro"
          />

          {showBookSuggestions && bookQuery && (
            <ul className="book-suggestions">
              {filteredBooks.map(book => (
                <li
                  key={book.id}
                  onClick={() => {
                    setBookQuery(book.title)
                    setBookId(book.id)
                    setShowBookSuggestions(false)
                    setCreatingNewBook(false)
                  }}
                >
                  {book.title}
                </li>
              ))}
              {filteredBooks.length === 0 && (
                <li
                  className="create-new-option"
                  onClick={() => {
                    setCreatingNewBook(true)
                    setShowBookSuggestions(false)
                    setBookId(null)
                  }}
                >
                  + Crear libro "{bookQuery}"
                </li>
              )}
            </ul>
          )}
        </div>

        {creatingNewBook && (
          <div className="new-book-fields">
            <div className="author-search">
              <input
                value={authorQuery}
                onChange={e => {
                  setAuthorQuery(e.target.value)
                  setAuthorId(null)
                  setShowAuthorSuggestions(true)
                }}
                onFocus={() => setShowAuthorSuggestions(true)}
                placeholder="Autor"
              />

              {showAuthorSuggestions && authorQuery && (
                <ul className="book-suggestions">
                  {filteredAuthors.map(author => (
                    <li
                      key={author.id}
                      onClick={() => {
                        setAuthorQuery(author.name)
                        setAuthorId(author.id)
                        setShowAuthorSuggestions(false)
                      }}
                    >
                      {author.name}
                    </li>
                  ))}
                  {filteredAuthors.length === 0 && (
                    <li
                      className="create-new-option"
                      onClick={() => setShowAuthorSuggestions(false)}
                    >
                      + Crear autor "{authorQuery}"
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        <input value={themes} onChange={e => setThemes(e.target.value)} placeholder="Temas" />
        <button type="submit">Añadir quote</button>
        <button type="button" onClick={onClose}>Cerrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default AddQuoteOverlay