import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, DollarSign, Copy, Check } from 'lucide-react';

function Message({ sender, content, isStructure }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // FIX: The string is now correctly wrapped in backticks (`)
    const textToCopy = `Decision: ${content.decision}\nAmount: ${content.amount}\nJustification:\n- ${content.justification.join('\n- ')}`;
    
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isStructure) {
    const isApproved = content.decision?.toLowerCase() === 'approved';
    return (
      <div className="message bot-structured">
        <div className="decision-header">
          <div className={`decision-title ${isApproved ? 'approved' : 'rejected'}`}>
            {isApproved ? <CheckCircle /> : <XCircle />}
            <span>Decision: {content.decision}</span>
          </div>
          <button onClick={handleCopy} className="copy-button">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <div className="details-grid">
          <div className="detail-item">
            <DollarSign className="detail-icon" />
            <div>
              <p className="detail-label">Amount</p>
              <p className="detail-value">{content.amount}</p>
            </div>
          </div>
          <div className="detail-item justification">
            <FileText className="detail-icon" />
            <div>
              <p className="detail-label">Justification</p>
              <ul className="justification-list">
                {content.justification?.map((clause, index) => (
                  <li key={index}>{clause}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Message;
