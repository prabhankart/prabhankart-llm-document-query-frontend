import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

// It now receives the questions as a prop
function SampleQuestions({ questions, onQuestionClick }) {
  // If there are no questions, don't render anything
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="sample-questions-container">
      <h3 className="sample-questions-title">
        <MessageSquarePlus size={20} />
        <span>Try an example</span>
      </h3>
      <div className="sample-questions-grid">
        {questions.map((q, index) => (
          <button key={index} onClick={() => onQuestionClick(q)} className="sample-question-btn">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SampleQuestions;