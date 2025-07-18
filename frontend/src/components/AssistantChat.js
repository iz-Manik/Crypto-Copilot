import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/api';
import ReactMarkdown from 'react-markdown';
const AssistantChat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: "Hello! I'm your Crypto Copilot 🤖 How can I assist you with cryptocurrencies today? You can ask about market trends, investment strategies, technical analysis, or specific coins."
    },
    {
      role: 'ai',
      content: "Try asking: \"What's the current sentiment for Bitcoin?\", \"Should I invest in Ethereum now?\", or \"Explain proof-of-stake in simple terms\"."
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userInput
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      // Send to backend
      const aiResponse = await sendMessage([
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userInput }
      ]);

      setMessages(prev => [...prev, {
        role: 'ai',
        content: aiResponse
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "Sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-assistant">
      <div className="chat-container">
        <div className="chat-header">
          <div className="ai-avatar">
            <i className="fas fa-robot"></i>
          </div>
          <div>
            <h3>AI Crypto Assistant</h3>
            <p>Ask me anything about cryptocurrencies</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <p><span className="typing-indicator">▋</span></p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            id="user-input"
            placeholder="Ask a question about cryptocurrencies..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit" id="send-btn">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssistantChat;