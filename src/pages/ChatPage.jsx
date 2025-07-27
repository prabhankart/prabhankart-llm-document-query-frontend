import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import DocumentPanel from '../components/DocumentPanel';
import Header from '../components/Header';
import UploadSection from '../components/UploadSection';

function ChatPage() {
  const [uploadData, setUploadData] = useState(null);

  // This function now receives an object with the file, summary, and questions
  const handleFileUpload = (data) => {
    setUploadData(data);
  };

  const handleReset = () => {
    setUploadData(null);
  };

  if (!uploadData) {
    return (
      <div className="full-page-layout">
        <Header onReset={handleReset} />
        <main className="upload-main-content">
          <UploadSection onFileUpload={handleFileUpload} />
        </main>
      </div>
    );
  }

  return (
    <div className="full-page-layout">
      <Header onReset={handleReset} />
      <main className="chat-main-content">
        <div className="document-panel-container glass-card">
          <DocumentPanel file={uploadData.file} />
        </div>
        <div className="chat-panel-container glass-card">
          {/* Pass both the summary and the new sample questions to the ChatBox */}
          <ChatBox 
            initialSummary={uploadData.summary} 
            sampleQuestions={uploadData.sampleQuestions} 
          />
        </div>
      </main>
    </div>
  );
}

export default ChatPage;
