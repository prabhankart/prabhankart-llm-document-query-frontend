import React from 'react';
import { MessageSquare, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <MessageSquare size={24} className="logo-icon" />
            <h3>Q&A Agent</h3>
          </div>
          <p>AI-powered knowledge search that transforms your internal docs into instant answers.</p>
          <a href="#" className="social-link"><Linkedin size={20} /> Follow us</a>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
          </div>
          <div className="link-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Q&A Agent. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;