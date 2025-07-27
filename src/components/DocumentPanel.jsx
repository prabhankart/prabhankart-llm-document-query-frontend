import React from 'react';
import { FileText, UploadCloud } from 'lucide-react';

function DocumentPanel({ file }) {
  return (
    <div className="document-panel">
      <header className="panel-header">
        <h2>Your Document</h2>
        <p>The AI will analyze this file to answer your questions.</p>
      </header>
      <div className="document-placeholder">
        <div className="placeholder-icon-container">
          <UploadCloud size={60} className="placeholder-icon" />
        </div>
        <div className="file-details">
          <FileText size={24} />
          <span className="file-name-display">{file?.name || 'document.pdf'}</span>
        </div>
        <p className="placeholder-note">This is a visual representation. The content has been processed securely.</p>
      </div>
    </div>
  );
}

export default DocumentPanel;
