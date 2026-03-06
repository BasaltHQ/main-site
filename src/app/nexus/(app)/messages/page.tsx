'use client'

import { useState, useEffect } from 'react'
import { Search, Send, Paperclip, MoreVertical, Star, Archive, Trash2, PenSquare, LayoutDashboard } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { getMessages, sendMessage, getCurrentProfile } from '../../actions'

export default function MessagesPage() {
    const [threads, setThreads] = useState<any[]>([])
    const [selectedThread, setSelectedThread] = useState<any | null>(null)
    const [composeOpen, setComposeOpen] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [currentUser, setCurrentUser] = useState<any>(null)

    // Fetch user and messages
    useEffect(() => {
        const init = async () => {
            try {
                const profile = await getCurrentProfile()
                setCurrentUser(profile)
                if (profile) fetchMessagesList()
            } catch (e) { console.error(e) }
        }
        init()
    }, [])

    const fetchMessagesList = async () => {
        try {
            const data = await getMessages()
            setThreads(data || [])
        } catch (e) { console.error(e) }
    }

    const handleSend = async () => {
        if (!newMessage.trim() || !currentUser) return
        setSending(true)

        // For demo, if admin, select an investor? If investor, send to generic admin?
        // Let's assume for now we are replying to the selected thread's 'other' person
        // If no selected thread (New Message), default to Admin.

        let targetId = null
        if (selectedThread) {
            targetId = selectedThread.sender_id === currentUser.id ? selectedThread.receiver_id : selectedThread.sender_id
        }

        try {
            await sendMessage(
                newMessage,
                selectedThread ? `Re: ${selectedThread.subject}` : 'New Inquiry',
                targetId
            )
            setNewMessage('')
            fetchMessagesList()
        } catch (e) {
            console.error(e)
            alert('Failed to send message.')
        }
        setSending(false)
    }

    return (
        <div className="h-[calc(100vh-140px)] flex gap-6 animate-fadeIn">
            {/* Thread List */}
            <div className="w-full md:w-80 lg:w-96 flex flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="p-4 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-rajdhani font-bold text-white tracking-wide">Messages</h2>
                        <button
                            onClick={() => { setSelectedThread(null); setComposeOpen(true); }}
                            className="p-2 bg-[#119dff] hover:bg-[#0d7acc] text-white rounded-lg transition-colors shadow-[0_0_15px_rgba(245,64,41,0.3)]"
                        >
                            <PenSquare size={18} />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                        <input
                            type="text"
                            placeholder="Search inbox..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:border-[#119dff] outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {threads.length === 0 ? (
                        <div className="p-8 text-center text-white/20 text-xs uppercase tracking-widest">No messages</div>
                    ) : (
                        threads.map((thread) => (
                            <div
                                key={thread.id}
                                onClick={() => setSelectedThread(thread)}
                                className={`p-4 border-b border-white/5 cursor-pointer transition-colors group relative ${selectedThread?.id === thread.id
                                    ? 'bg-white/5'
                                    : 'hover:bg-white/[0.02]'
                                    }`}
                            >
                                {selectedThread?.id === thread.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#119dff]" />
                                )}
                                <div className="flex gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border ${selectedThread?.id === thread.id ? 'border-[#119dff]/50 text-[#119dff]' : 'border-white/10 text-white/40'} bg-black/40`}>
                                        {(thread.sender?.full_name || 'U').charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <p className={`text-sm truncate ${!thread.is_read ? 'text-white font-bold' : 'text-white/80'}`}>
                                                {thread.sender?.full_name || 'Unknown'}
                                            </p>
                                            <span className="text-[10px] text-white/30 whitespace-nowrap ml-2">{formatDistanceToNow(new Date(thread.created_at))}</span>
                                        </div>
                                        <p className={`text-xs truncate mb-1 ${!thread.is_read ? 'text-white font-medium' : 'text-white/60'}`}>
                                            {thread.subject || 'No Subject'}
                                        </p>
                                        <p className="text-[10px] text-white/40 truncate">
                                            {thread.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Message Content */}
            <div className="hidden md:flex flex-1 flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm relative">
                {selectedThread ? (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-white/[0.02] to-transparent">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#119dff] to-[#0a5c99] flex items-center justify-center text-white font-bold border border-white/10 shadow-[0_0_20px_rgba(245,64,41,0.2)]">
                                    {(selectedThread.sender?.full_name || 'U').charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white mb-1">{selectedThread.subject}</h2>
                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                        <span>From: <span className="text-white">{selectedThread.sender?.full_name}</span></span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span>To: <span className="text-white">You</span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-white/40 hover:text-[#119dff] hover:bg-white/5 rounded-lg transition-colors">
                                    <Star size={18} />
                                </button>
                                <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                    <Archive size={18} />
                                </button>
                                <button className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                                <div className="w-px h-8 bg-white/10 mx-1" />
                                <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-8 overflow-y-auto font-light text-white/80 leading-relaxed whitespace-pre-wrap">
                            {selectedThread.content}

                            <div className="pt-6 border-t border-white/5 mt-8">
                                <p className="font-bold text-white text-xs uppercase tracking-wider">Secured via Nexus Protocol</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                        <LayoutDashboard size={48} className="mb-4" />
                        <p className="uppercase tracking-widest text-xs">Select a secure transmission</p>
                    </div>
                )}

                {/* Reply Area - Always visible if a thread is selected OR compose mode */}
                {(selectedThread || composeOpen) && (
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <div className="bg-black/50 border border-white/10 rounded-xl p-2 relative focus-within:border-[#119dff]/50 transition-colors">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="w-full bg-transparent text-white p-3 min-h-[100px] outline-none text-sm resize-none"
                                placeholder="Type your secure message..."
                            />
                            <div className="flex justify-between items-center px-2 pb-2">
                                <button className="text-white/40 hover:text-white transition-colors">
                                    <Paperclip size={18} />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={sending}
                                    className="bg-[#119dff] hover:bg-[#0d7acc] disabled:bg-white/10 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide flex items-center gap-2 transition-colors shadow-lg shadow-red-900/20"
                                >
                                    {sending ? 'Sending...' : 'Send'} <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
