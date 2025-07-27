import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="ai-badge">AI-Powered Knowledge Search</div>
        <h1>Your Internal Docs, <br /> <span className="gradient-text">Answered in Seconds</span></h1>
        <p className="hero-subtitle">Connect your documents and empower your team to ask, get, and act — instantly.</p>
        <div className="hero-buttons">
          {/* This button now navigates to the chat page */}
          <Link to="/chat" className="premium-button">
            Try Demo &rarr;
          </Link>
          <button type="button" className="secondary-button">
            <PlayCircle size={20} /> Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
