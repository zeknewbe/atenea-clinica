'use client'

import { useState } from 'react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply || 'No se recibió respuesta del modelo.',
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error al contactar con el modelo.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border rounded p-4 h-full flex flex-col bg-white shadow">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-100 text-right'
                : 'bg-gray-100 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Escribí tu mensaje..."
        rows={3}
        className="w-full border rounded p-2 resize-none"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  )
}