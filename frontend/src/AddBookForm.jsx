// src/AddBookForm.jsx
import { useState } from 'react'

function AddBookForm({ onBookAdded }) {
    const [title, setTitle] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [themes, setThemes] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                book: { title, author_id: authorId, themes }
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al guardar el libro')
                return res.json()
            })
            .then(newBook => {
                onBookAdded(newBook)
                setTitle('')
                setAuthorId('')
                setThemes('')
            })
            .catch(err => setError(err.message))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
            <input value={authorId} onChange={e => setAuthorId(e.target.value)} placeholder="ID del autor" />
            <input value={themes} onChange={e => setThemes(e.target.value)} placeholder="Temas" />
            <button type="submit">Añadir libro</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default AddBookForm