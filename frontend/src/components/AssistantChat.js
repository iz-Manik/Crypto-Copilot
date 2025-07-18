import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '../services/api';
import ReactMarkdown from 'react-markdown';
import GlassCard from './GlassCard';

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
    <motion.div 
      className="ai-assistant-3d"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <GlassCard className="chat-container-3d">
        <motion.div 
          className="chat-header-3d"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div 
            className="ai-avatar-3d"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotateY: { duration: 4, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity, repeatDelay: 3 }
            }}
          >
            <i className="fas fa-robot"></i>
          </motion.div>
          <div className="chat-header-text">
            <motion.h3
              animate={{ color: ['#00b4db', '#e94560', '#00b4db'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AI Crypto Assistant
            </motion.h3>
            <p>Ask me anything about cryptocurrencies</p>
          </div>
        </motion.div>

        <div className="chat-messages-3d">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div 
                key={index} 
                className={`message-3d ${msg.role}`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div 
                className="message-3d ai typing-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.p>
                  <motion.span 
                    className="typing-indicator-3d"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ▋
                  </motion.span>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <motion.form 
          className="chat-input-3d" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <input
            type="text"
            className="chat-input-field-3d"
            id="user-input"
            placeholder="Ask a question about cryptocurrencies..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <motion.button 
            type="submit" 
            className="send-btn-3d"
            whileHover={{ 
              scale: 1.1,
              rotate: 15,
              boxShadow: '0 5px 20px rgba(0, 180, 219, 0.4)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.i 
              className="fas fa-paper-plane"
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            />
          </motion.button>
        </motion.form>
      </GlassCard>
    </motion.div>
  );
};

export default AssistantChat;