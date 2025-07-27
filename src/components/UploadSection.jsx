import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Search, Bot, UploadCloud } from 'lucide-react';
import { uploadFile } from '../api';

const features = [
    { title: "Parse & Structure", description: "Identify key details like age, location, and policy terms.", icon: <FileText /> },
    { title: "Semantic Search", description: "Go beyond keywords to find relevant clauses based on context.", icon: <Search /> },
    { title: "AI-Powered Decisions", description: "Evaluate information to determine outcomes like approval status.", icon: <Bot /> }
];

function UploadSection({ onFileUpload }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Drag & drop a file here, or click to select");
    const [generateSummary, setGenerateSummary] = useState(true);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setStatusMessage(`Selected: ${acceptedFiles[0].name}`);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        multiple: false,
    });

    const handleStartQuerying = async () => {
        if (!file) return;

        setIsLoading(true);
        setStatusMessage("Processing document... This may take a moment.");

        try {
            const response = await uploadFile(file, generateSummary); 

            if (response.success) {
                // Pass the file, summary, and sample questions to the parent
                onFileUpload({ 
                    file, 
                    summary: response.summary, 
                    sampleQuestions: response.sampleQuestions 
                });
            } else {
                setStatusMessage(response.error || "Upload failed. Please try again.");
                setIsLoading(false);
            }
        } catch (error) {
            setStatusMessage("An error occurred. Please check the console.");
            setIsLoading(false);
        }
    };

    return (
        <section id="upload-section" className="section-container upload-section">
            <h2 className="section-title">Upload Your Document</h2>
            <p className="section-subtitle">Harnessing LLMs to extract intelligent insights from your unstructured data.</p>
            
            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            <div {...getRootProps({ className: `upload-dropzone ${isDragActive ? 'active' : ''}` })}>
                <input {...getInputProps()} />
                <UploadCloud size={48} />
                <p>{statusMessage}</p>
            </div>

            <div className="summary-option">
                <input 
                    type="checkbox" 
                    id="summary-checkbox" 
                    checked={generateSummary}
                    onChange={(e) => setGenerateSummary(e.target.checked)}
                />
                <label htmlFor="summary-checkbox">Generate initial summary of the document</label>
            </div>

            <button onClick={handleStartQuerying} className="premium-button" disabled={!file || isLoading}>
                {isLoading ? 'Processing...' : 'Start Querying'}
            </button>
        </section>
    );
}

export default UploadSection;