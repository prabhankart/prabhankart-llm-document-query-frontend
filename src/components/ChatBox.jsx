import React, { useState, useRef, useEffect } from 'react';
import { sendQuery } from '../api';
import Message from './Message';
import Spinner from './Spinner';
import SampleQuestions from './SampleQuestions';
import { Send } from 'lucide-react';

// It now accepts a prop for the dynamic sample questions
function ChatBox({ initialSummary, sampleQuestions }) {
  const getInitialMessage = () => {
    const text = initialSummary || "I have analyzed the document. What would you like to know?";
    return { 
      sender: 'bot', 
      content: text,
      isStructure: false
    };
  };

  const [messages, setMessages] = useState([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitQuery = async (queryText) => {
    if (!queryText.trim() || isLoading) return;

    setConversationStarted(true);
    const userMessage = { sender: 'user', content: queryText, isStructure: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendQuery(queryText);
      const botMessage = { sender: 'bot', content: response, isStructure: true };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        sender: 'bot', 
        content: {
          decision: "Error",
          amount: "N/A",
          justification: ["Sorry, I encountered an error connecting to the server. Please try again."]
        }, 
        isStructure: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuery(input);
  };

  const handleSampleQuestionClick = (question) => {
    submitQuery(question);
  };

  return (
    <div className="chatbox-container">
      <div className="messages-area">
        {messages.map((msg, idx) => (
          <Message 
            key={idx} 
            sender={msg.sender} 
            content={msg.content}
            isStructure={msg.isStructure}
          />
        ))}
        {/* Pass the dynamic questions to the SampleQuestions component */}
        {!conversationStarted && (
          <SampleQuestions 
            questions={sampleQuestions} 
            onQuestionClick={handleSampleQuestionClick} 
          />
        )}
        {isLoading && <div className="typing-indicator"><Spinner simple={true} /></div>}
        <div ref={messagesEndRef} />
      </div>
      <footer className="chat-footer">
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            placeholder="e.g., Is a 46-year-old male covered for knee surgery?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="premium-button" disabled={isLoading || !input.trim()}>
            <Send size={20} />
          </button>
        </form>
        <p className="footer-note">Powered by Large Language Models</p>
      </footer>
    </div>
  );
}

export default ChatBox;