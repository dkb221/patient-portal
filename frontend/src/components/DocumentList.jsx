import React, { useState } from 'react';
import { downloadDocument, deleteDocument } from '../services/api';
import './DocumentList.css';

const DocumentList = ({ documents, loading, onDeleteSuccess }) => {
  const [deleting, setDeleting] = useState(null);
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (doc) => {
    setDownloading(doc.id);
    try {
      await downloadDocument(doc.id, doc.filename);
    } catch (error) {
      alert('Failed to download: ' + error.message);
    } finally {
      setDownloading(null);
    }
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`Are you sure you want to delete "${doc.filename}"?`)) {
      return;
    }

    setDeleting(doc.id);
    try {
      await deleteDocument(doc.id);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="documents-section">
        <h2>My Documents</h2>
        <div className="loading">
          <div className="spinner-large"></div>
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="documents-section">
      <h2>My Documents ({documents.length})</h2>

      {documents.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 8L8 20V44L32 56L56 44V20L32 8Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32 32V56M32 32L8 20M32 32L56 20" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>No documents yet</h3>
          <p>Upload your first document to get started</p>
        </div>
      ) : (
        <div className="documents-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="document-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="4" width="32" height="40" rx="2" fill="#EF4444" opacity="0.1"/>
                  <path d="M14 4H34L40 10V42C40 43.1 39.1 44 38 44H14C12.9 44 12 43.1 12 42V6C12 4.9 12.9 4 14 4Z" fill="#EF4444"/>
                  <text x="24" y="28" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">PDF</text>
                </svg>
              </div>

              <div className="document-info">
                <h3 className="document-name" title={doc.filename}>
                  {doc.filename}
                </h3>
                <div className="document-meta">
                  <span className="file-size">{formatFileSize(doc.filesize)}</span>
                  <span className="separator">•</span>
                  <span className="upload-date">{formatDate(doc.created_at)}</span>
                </div>
              </div>

              <div className="document-actions">
                <button
                  className="btn-icon btn-download"
                  onClick={() => handleDownload(doc)}
                  disabled={downloading === doc.id}
                  title="Download"
                >
                  {downloading === doc.id ? (
                    <span className="spinner-small"></span>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path d="M3 17h14M10 3v10m0 0l-4-4m4 4l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(doc)}
                  disabled={deleting === doc.id}
                  title="Delete"
                >
                  {deleting === doc.id ? (
                    <span className="spinner-small"></span>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path d="M3 5h14M8 5V3h4v2m-5 5v6m4-6v6M5 5l1 12h8l1-12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentList;