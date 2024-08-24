'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: `Here's some information about "${input}". How else can I help you?` }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-black text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Chat with RateMyProfessor AI</h1>
      </header>
      
      <main className="flex-grow overflow-hidden flex flex-col p-4">
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto mb-4 space-y-4"
        >
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-black text-white self-end' 
                  : 'bg-gray-300 text-gray-800 self-start'
              } max-w-[80%] break-words`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </main>
    </div>
  );
}