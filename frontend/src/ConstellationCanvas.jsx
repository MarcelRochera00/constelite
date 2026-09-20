import { useState, useEffect, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d';

function ConstellationCanvas() {
    const [quoteData, setQuoteData] = useState({ nodes: [], links: [] })
    const [error, setError] = useState(null)
    const fgRef = useRef()

    useEffect(() => {
        fetch('http://localhost:3000/constellations/graph')
            .then(res => res.json())
            .then(data => setQuoteData({
                nodes: data.quotes.map(q => ({
                    id: q.id,
                    name: q.text,
                    offset: Math.random() * 10
                })),
                links: data.quote_links.map(ql => ({
                    source: ql.quote_a_id,
                    target: ql.quote_b_id
                }))
            }))
            .catch(err => setError(err.message))
    }, [])


    return (
        <ForceGraph2D nodeLabel={node => node.name} cooldownTime={Infinity} graphData={quoteData} backgroundColor='#0a0a1a' nodeCanvasObject={(node, ctx, globalScale) => {
            if (node.x === undefined || node.y === undefined) return

            const pulso = Math.sin(Date.now() * 0.002 + node.offset)
            const glowRadius = (pulso + 1) * 1.5
            const coreRadius = 1

            const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius)
            glow.addColorStop(0, 'rgba(255, 255, 255, 1)')
            glow.addColorStop(0.4, 'rgba(255, 255, 255, 0.67)')
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)')

            ctx.beginPath()
            ctx.arc(node.x, node.y, glowRadius, 0, 2 * Math.PI)
            ctx.fillStyle = glow
            ctx.fill()

            ctx.beginPath()
            ctx.arc(node.x, node.y, coreRadius, 0, 2 * Math.PI)
            ctx.fillStyle = 'white'
            ctx.fill()
        }}
            nodePointerAreaPaint={(node, color, ctx) => {
                if (node.x === undefined || node.y === undefined) return
                ctx.beginPath()
                ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI)
                ctx.fillStyle = color
                ctx.fill()
            }}

            linkCanvasObject={(link, ctx) => {
                const start = link.source
                const end = link.target
                if (!start.x || !end.x) return

                ctx.beginPath()
                ctx.moveTo(start.x, start.y)
                ctx.lineTo(end.x, end.y)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'  // 70% opacidad, como querías para confirmadas
                ctx.lineWidth = 0.8
                ctx.shadowColor = 'white'
                ctx.shadowBlur = 6
                ctx.stroke()
            }} />
    )
}

export default ConstellationCanvas