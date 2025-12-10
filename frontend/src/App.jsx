import React, { useState, useEffect } from 'react';
import './App.css';
import DocumentUpload from './components/DocumentUpload';
import DocumentList from './components/DocumentList';
import Header from './components/Header';
import { getDocuments } from './services/api';

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchDocuments(); // Refresh list after upload
  };

  const handleDeleteSuccess = () => {
    fetchDocuments(); // Refresh list after delete
  };

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
        
        {/* NEW: Side-by-Side Grid Layout */}
        <div className="main-grid">
          <DocumentUpload onUploadSuccess={handleUploadSuccess} />
          
          <DocumentList 
            documents={documents}
            loading={loading}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </main>

      <footer className="footer">
        <p>Patient Portal © 2024 | Secure Document Management</p>
      </footer>
    </div>
  );
}

export default App;