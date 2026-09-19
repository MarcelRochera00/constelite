import { useState, useEffect } from 'react'
import ForceGraph2D from 'react-force-graph-2d';

function ConstelationCanvas() {
    const [quoteData, setQuoteData] = useState({ nodes: [], links: [] })
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch('http://localhost:3000/quotes')
            .then(res => res.json())
            .then(data => setQuoteData({
                nodes: data.map(q => ({
                    id: q.id,
                    name: q.text
                })), links: []
            }
            ))
            .catch(err => setError(err.message))
    }, [])



    return (
        <ForceGraph2D graphData={quoteData} backgroundColor='#0a0a1a' />
    )
}

export default ConstelationCanvas