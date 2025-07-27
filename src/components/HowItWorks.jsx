import React from 'react';
import { Link, MessageCircle, Zap } from 'lucide-react';

const steps = [
    {
        title: "Connect Your Docs",
        description: "Securely upload your PDF, DOCX, or other text-based documents directly.",
        icon: <Link />
    },
    {
        title: "Ask Anything",
        description: "Your team asks questions in natural language with no context switching required.",
        icon: <MessageCircle />
    },
    {
        title: "Get Instant Answers",
        description: "Receive precise answers with direct references to the source documents in seconds.",
        icon: <Zap />
    }
];

function HowItWorks() {
    return (
        <section id="how-it-works" className="section-container">
            <div className="ai-badge">Simple Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Transform your team's knowledge management in three simple steps.</p>
            <div className="how-it-works-grid">
                {steps.map((step, index) => (
                    <div key={index} className="how-it-works-card">
                        <div className="step-number">{index + 1}</div>
                        <div className="feature-icon">{step.icon}</div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HowItWorks;