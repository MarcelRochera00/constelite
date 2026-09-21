import { useState, useEffect, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d';

function ConstellationCanvas() {
    const [quoteData, setQuoteData] = useState({ nodes: [], links: [] })
    const [constellations, setConstellations] = useState([])
    const [error, setError] = useState(null)
    const constellationBoxesRef = useRef([])
    const isZooming = useRef(false)
    const fgRef = useRef()

    useEffect(() => {
        fetch('http://localhost:3000/constellations/graph')
            .then(res => res.json())
            .then(data => {
                setQuoteData({
                    nodes: data.quotes.map(q => ({
                        id: q.id,
                        name: q.text,
                        offset: Math.random() * 10
                    })),
                    links: data.quote_links.map(ql => ({
                        source: ql.quote_a_id,
                        target: ql.quote_b_id
                    }))
                })
                setConstellations(data.constellations)
            })
            .catch(err => setError(err.message))
    }, [])

    return (
        <ForceGraph2D
            ref={fgRef}
            nodeLabel={node => node.name}
            cooldownTime={Infinity}
            graphData={quoteData}
            backgroundColor='rgba(0,0,0,0)'
            nodeCanvasObject={(node, ctx, globalScale) => {
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
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
                ctx.lineWidth = 0.8
                ctx.shadowColor = 'white'
                ctx.shadowBlur = 6
                ctx.stroke()
            }}
            onRenderFramePost={(ctx, globalScale) => {
                const constellationBoxesThisFrame = []
                constellations.forEach(constellation => {
                    const centro = calcularCentroide(constellation, quoteData.nodes)
                    if (isNaN(centro.x) || isNaN(centro.y)) return

                    const texto = constellation.title.toUpperCase()
                    ctx.font = '300 11px sans-serif'
                    const textWidth = ctx.measureText(texto).width

                    const paddingX = 14
                    const boxWidth = textWidth + paddingX * 2
                    const boxHeight = 22
                    const boxX = centro.x - boxWidth / 2
                    const boxY = centro.y - 36 - boxHeight / 2
                    const radius = boxHeight / 2

                    ctx.beginPath()
                    ctx.moveTo(boxX + radius, boxY)
                    ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, radius)
                    ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, radius)
                    ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, radius)
                    ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, radius)
                    ctx.closePath()

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
                    ctx.fill()

                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
                    ctx.lineWidth = 0.6
                    ctx.stroke()

                    ctx.font = '300 11px "Courier New", monospace'
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
                    ctx.shadowBlur = 8
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
                    ctx.textBaseline = 'middle'
                    ctx.textAlign = 'center'
                    ctx.fillText(texto, centro.x, boxY + boxHeight / 2)
                    ctx.shadowBlur = 0

                    constellationBoxesThisFrame.push({ constellation, boxX, boxY, boxWidth, boxHeight })
                })
                constellationBoxesRef.current = constellationBoxesThisFrame
            }}
            onBackgroundClick={(coords) => {
                if (isZooming.current) return
                if (!fgRef.current || typeof fgRef.current.screen2GraphCoords !== 'function') return

                const graphCoords = fgRef.current.screen2GraphCoords(coords.clientX, coords.clientY)

                const clicked = constellationBoxesRef.current.find(box =>
                    graphCoords.x >= box.boxX && graphCoords.x <= box.boxX + box.boxWidth &&
                    graphCoords.y >= box.boxY && graphCoords.y <= box.boxY + box.boxHeight
                )

                if (clicked) {
                    isZooming.current = true
                    fgRef.current.zoomToFit(1500, 500, node => clicked.constellation.quote_ids.includes(node.id))
                    setTimeout(() => { isZooming.current = false }, 1000)
                }
            }}
        />
    )
}

function calcularCentroide(constellation, nodes) {
    const nodosDeEstaConstelacion = nodes.filter(node => constellation.quote_ids.includes(node.id) && node.x !== undefined && node.y !== undefined)
    const sumaX = nodosDeEstaConstelacion.reduce((acumulado, node) => acumulado + node.x, 0)
    const sumaY = nodosDeEstaConstelacion.reduce((acumulado, node) => acumulado + node.y, 0)
    const centroideX = sumaX / nodosDeEstaConstelacion.length
    const centroideY = sumaY / nodosDeEstaConstelacion.length

    return { x: centroideX, y: centroideY }
}

export default ConstellationCanvas