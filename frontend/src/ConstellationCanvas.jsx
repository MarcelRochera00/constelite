import { useState, useEffect, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d';

function ConstellationCanvas() {
    const [quoteData, setQuoteData] = useState({ nodes: [], links: [] })
    const [constellations, setConstellations] = useState([])
    const [error, setError] = useState(null)
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
                }), setConstellations(data.constellations)
            })
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
            }}
            onRenderFramePost={(ctx, globalScale) => {
                constellations.forEach(constellation => {
                    const centro = calcularCentroide(constellation, quoteData.nodes)
                    if (isNaN(centro.x) || isNaN(centro.y)) return

                    const texto = constellation.title.toUpperCase()
                    ctx.font = '300 10px sans-serif'

                    // Espaciado manual entre letras, para un aire más "elegante/técnico"
                    const letterSpacing = 2
                    let textWidth = 0
                    for (const char of texto) {
                        textWidth += ctx.measureText(char).width + letterSpacing
                    }

                    const paddingX = 14
                    const paddingY = 6
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

                    // Texto con espaciado manual, brillo muy sutil
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
                    ctx.shadowBlur = 12
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
                    ctx.textBaseline = 'middle'

                    let cursorX = centro.x - textWidth / 2
                    const textY = boxY + boxHeight / 2
                    for (const char of texto) {
                        ctx.fillText(char, cursorX, textY)
                        cursorX += ctx.measureText(char).width + letterSpacing
                    }
                    ctx.shadowBlur = 0
                })
            }} />
    )
}

function calcularCentroide(constellation, nodes) {
    console.log('quote_ids:', constellation.quote_ids, 'primer node id:', nodes[0]?.id, typeof nodes[0]?.id, typeof constellation.quote_ids[0])

    const nodosDeEstaConstelacion = nodes.filter(node =>
        constellation.quote_ids.includes(node.id) && node.x !== undefined && node.y !== undefined
    )
    //const nodosDeEstaConstelacion = nodes.filter(node => constellation.quote_ids.includes(node.id) && node.x !== undefined && node.y !== undefined)
    const sumaX = nodosDeEstaConstelacion.reduce((acumulado, node) => acumulado + node.x, 0)
    const sumaY = nodosDeEstaConstelacion.reduce((acumulado, node) => acumulado + node.y, 0)
    const centroideX = sumaX / nodosDeEstaConstelacion.length
    const centroideY = sumaY / nodosDeEstaConstelacion.length

    return { x: centroideX, y: centroideY }
}


export default ConstellationCanvas