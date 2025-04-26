import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  async function sendMessage() {
    if (!input) return
    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    })
    const data = await res.json()
    const botMsg = { sender: 'bot', text: data.reply || 'Error' }
    setMessages(prev => [...prev, botMsg])
  }

  return (
    <>
      <Head>
        <title>TechnDucts</title>
        <meta name="description" content="TechnDucts digital studio" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2ecc71" />
      </Head>
      <div style={{ padding: '20px' }}>
        <h1>Welcome to TechnDucts</h1>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left' }}>
              <strong>{m.sender}:</strong> {m.text}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '10px' }}>
          <input
            style={{ width: '80%', padding: '8px' }}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} style={{ padding: '8px 16px', marginLeft: '8px' }}>Send</button>
        </div>
      </div>
    </>
  )
}