import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

// The component now accepts an 'onReset' function as a prop
function Header({ onReset }) {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // If the onReset function is provided (meaning we are on the chat page),
    // then call it to reset the page.
    if (onReset) {
      onReset();
    } else {
      // Otherwise (on the landing page), navigate to the chat page.
      navigate('/chat');
    }
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <RouterLink to="/" className="logo">
          <MessageSquare size={28} className="logo-icon" />
          <h1>SmartClaim AI</h1>
        </RouterLink>
        <nav className="main-nav">
          <a href="/">Features</a>
          <a href="/">How It Works</a>
        </nav>
        {/* This is now a regular button with a smart onClick handler */}
        <button onClick={handleGetStartedClick} className="premium-button get-started-btn">
          {onReset ? 'Start New Chat' : 'Get Started'}
        </button>
      </div>
    </header>
  );
}

export default Header;