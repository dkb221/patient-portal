import React, { useState } from 'react';
import { uploadDocument } from '../services/api';
import './DocumentUpload.css';

const DocumentUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'Only PDF files are allowed' });
        setFile(null);
        return;
      }

      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 10MB' });
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      await uploadDocument(file);
      setMessage({ type: 'success', text: 'Document uploaded successfully!' });
      setFile(null);
      
      // Reset file input
      document.getElementById('file-input').value = '';
      
      // Notify parent
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Document</h2>
      
      <form onSubmit={handleUpload} className="upload-form">
        <div className="file-input-wrapper">
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label htmlFor="file-input" className="file-input-label">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{file ? file.name : 'Choose PDF file'}</span>
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p><strong>File:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <span className="spinner"></span>
              Uploading...
            </>
          ) : (
            'Upload Document'
          )}
        </button>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;