'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, Trash2, X } from 'lucide-react'

interface Annotation {
    id: string
    document_key: string
    page: number
    type: 'highlight' | 'comment'
    x: number
    y: number
    width: number
    height: number
    text: string
    user_email: string
    user_name: string
    user_color: string
    created_at: string
}

// Deterministic color from email hash
export function userColor(email: string): string {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#FF8C42', '#6BCB77', '#4D96FF', '#FF6B9D',
        '#C792EA', '#82AAFF', '#F78C6C', '#FFCB6B', '#89DDFF',
    ]
    let hash = 0
    for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

interface Props {
    documentKey: string
    pageNumber: number
    userEmail: string
    userName: string
    activeTool: 'none' | 'highlight' | 'comment'
}

export default function PdfAnnotationOverlay({ documentKey, pageNumber, userEmail, userName, activeTool }: Props) {
    const [annotations, setAnnotations] = useState<Annotation[]>([])
    const [drawing, setDrawing] = useState(false)
    const [drawStart, setDrawStart] = useState({ x: 0, y: 0 })
    const [drawCurrent, setDrawCurrent] = useState({ x: 0, y: 0 })
    const [commentPos, setCommentPos] = useState<{ x: number; y: number } | null>(null)
    const [commentText, setCommentText] = useState('')
    const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const myColor = userColor(userEmail)

    // Fetch annotations for current page
    useEffect(() => {
        if (!documentKey) return
        fetch(`/api/nexus/annotations?key=${encodeURIComponent(documentKey)}&page=${pageNumber}`)
            .then(r => r.json())
            .then(d => setAnnotations(d.annotations || []))
            .catch(() => { })
    }, [documentKey, pageNumber])

    // Close comment input when switching tools
    useEffect(() => {
        if (activeTool !== 'comment') {
            setCommentPos(null)
            setCommentText('')
        }
    }, [activeTool])

    // Convert mouse event to percentage coordinates
    const toPercent = useCallback((e: React.MouseEvent) => {
        if (!overlayRef.current) return { x: 0, y: 0 }
        const rect = overlayRef.current.getBoundingClientRect()
        return {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        }
    }, [])

    function handleMouseDown(e: React.MouseEvent) {
        if (activeTool === 'highlight') {
            const pos = toPercent(e)
            setDrawing(true)
            setDrawStart(pos)
            setDrawCurrent(pos)
        } else if (activeTool === 'comment') {
            const pos = toPercent(e)
            setCommentPos(pos)
        }
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (drawing && activeTool === 'highlight') {
            setDrawCurrent(toPercent(e))
        }
    }

    async function handleMouseUp() {
        if (drawing && activeTool === 'highlight') {
            setDrawing(false)
            const x = Math.min(drawStart.x, drawCurrent.x)
            const y = Math.min(drawStart.y, drawCurrent.y)
            const w = Math.abs(drawCurrent.x - drawStart.x)
            const h = Math.abs(drawCurrent.y - drawStart.y)

            if (w < 1 && h < 1) return

            try {
                const res = await fetch('/api/nexus/annotations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        document_key: documentKey, page: pageNumber, type: 'highlight',
                        x, y, width: w, height: h,
                        user_email: userEmail, user_name: userName, user_color: myColor
                    })
                })
                const data = await res.json()
                if (data.id) {
                    setAnnotations(prev => [...prev, {
                        id: data.id, document_key: documentKey, page: pageNumber,
                        type: 'highlight', x, y, width: w, height: h, text: '',
                        user_email: userEmail, user_name: userName, user_color: myColor,
                        created_at: new Date().toISOString()
                    }])
                }
            } catch (e) { console.error(e) }
        }
    }

    async function handleCommentSubmit() {
        if (!commentPos || !commentText.trim()) return
        try {
            const res = await fetch('/api/nexus/annotations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    document_key: documentKey, page: pageNumber, type: 'comment',
                    x: commentPos.x, y: commentPos.y,
                    text: commentText, user_email: userEmail, user_name: userName, user_color: myColor
                })
            })
            const data = await res.json()
            if (data.id) {
                setAnnotations(prev => [...prev, {
                    id: data.id, document_key: documentKey, page: pageNumber,
                    type: 'comment', x: commentPos.x, y: commentPos.y, width: 0, height: 0,
                    text: commentText, user_email: userEmail, user_name: userName, user_color: myColor,
                    created_at: new Date().toISOString()
                }])
            }
        } catch (e) { console.error(e) }
        setCommentText('')
        setCommentPos(null)
    }

    async function handleDelete(id: string) {
        try {
            await fetch(`/api/nexus/annotations?id=${id}&email=${encodeURIComponent(userEmail)}`, { method: 'DELETE' })
            setAnnotations(prev => prev.filter(a => a.id !== id))
        } catch (e) { console.error(e) }
    }

    return (
        <div
            ref={overlayRef}
            className="absolute inset-0"
            style={{
                cursor: activeTool === 'highlight' ? 'crosshair' : activeTool === 'comment' ? 'cell' : 'default',
                pointerEvents: activeTool === 'none' ? 'none' : 'auto',
                zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Existing Highlights */}
            {annotations.filter(a => a.type === 'highlight').map(a => (
                <div
                    key={a.id}
                    className="absolute group"
                    style={{
                        left: `${a.x}%`, top: `${a.y}%`,
                        width: `${a.width}%`, height: `${a.height}%`,
                        backgroundColor: a.user_color + '25',
                        border: `1.5px solid ${a.user_color}50`,
                        borderRadius: '2px',
                        pointerEvents: 'auto',
                    }}
                    onMouseEnter={() => setHoveredAnnotation(a.id)}
                    onMouseLeave={() => setHoveredAnnotation(null)}
                >
                    {hoveredAnnotation === a.id && (
                        <div className="absolute -top-7 left-0 bg-[#111] border border-white/10 rounded px-2 py-0.5 flex items-center gap-2 whitespace-nowrap z-20" style={{ pointerEvents: 'auto' }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.user_color }} />
                            <span className="text-[9px] text-white/60">{a.user_name || a.user_email.split('@')[0]}</span>
                            {a.user_email === userEmail && (
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }} className="text-red-400/60 hover:text-red-400">
                                    <Trash2 size={10} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {/* Existing Comments (pins) */}
            {annotations.filter(a => a.type === 'comment').map(a => (
                <div
                    key={a.id}
                    className="absolute"
                    style={{
                        left: `${a.x}%`, top: `${a.y}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                        zIndex: hoveredAnnotation === a.id ? 30 : 15
                    }}
                    onMouseEnter={() => setHoveredAnnotation(a.id)}
                    onMouseLeave={() => setHoveredAnnotation(null)}
                >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                        style={{ backgroundColor: a.user_color }}>
                        <MessageCircle size={10} className="text-white" />
                    </div>
                    {hoveredAnnotation === a.id && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#111] border border-white/10 rounded-lg p-2.5 min-w-[160px] max-w-[220px] z-30 shadow-xl" style={{ pointerEvents: 'auto' }}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.user_color }} />
                                    <span className="text-[9px] font-bold text-white/60">{a.user_name || a.user_email.split('@')[0]}</span>
                                </div>
                                {a.user_email === userEmail && (
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }} className="text-red-400/60 hover:text-red-400">
                                        <Trash2 size={10} />
                                    </button>
                                )}
                            </div>
                            <p className="text-[10px] text-white/50 leading-relaxed">{a.text}</p>
                            <p className="text-[8px] text-white/20 mt-1">{new Date(a.created_at).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* Active highlight drawing preview */}
            {drawing && (
                <div className="absolute pointer-events-none" style={{
                    left: `${Math.min(drawStart.x, drawCurrent.x)}%`,
                    top: `${Math.min(drawStart.y, drawCurrent.y)}%`,
                    width: `${Math.abs(drawCurrent.x - drawStart.x)}%`,
                    height: `${Math.abs(drawCurrent.y - drawStart.y)}%`,
                    backgroundColor: myColor + '30',
                    border: `2px dashed ${myColor}`,
                    borderRadius: '2px',
                }} />
            )}

            {/* Comment input popover */}
            {commentPos && (
                <div className="absolute z-30" style={{ left: `${commentPos.x}%`, top: `${commentPos.y}%`, pointerEvents: 'auto' }}
                    onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: myColor, transform: 'translate(-50%, -50%)' }} />
                    <div className="absolute top-2 left-2 bg-[#111] border border-white/10 rounded-xl p-3 min-w-[200px] shadow-2xl">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: myColor }} />
                            <span className="text-[9px] text-white/40">{userName || 'You'}</span>
                        </div>
                        <textarea
                            autoFocus
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white outline-none resize-none h-16 focus:border-[#119dff] placeholder:text-white/20"
                        />
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleCommentSubmit} disabled={!commentText.trim()}
                                className="flex-1 py-1.5 bg-[#119dff]/10 border border-[#119dff]/20 text-[#119dff] rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#119dff]/20 transition-all disabled:opacity-30">
                                Post
                            </button>
                            <button onClick={() => { setCommentPos(null); setCommentText('') }}
                                className="py-1.5 px-3 bg-white/5 border border-white/10 text-white/40 rounded-lg text-[10px] hover:text-white transition-all">
                                <X size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
