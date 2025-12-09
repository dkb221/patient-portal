const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Upload a document
 */
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
};

/**
 * Get all documents
 */
export const getDocuments = async () => {
  const response = await fetch(`${API_BASE_URL}/documents`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  const result = await response.json();
  return result.data || [];
};

/**
 * Download a document
 */
export const downloadDocument = async (id, filename) => {
  const response = await fetch(`${API_BASE_URL}/documents/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to download document');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/**
 * Delete a document
 */
export const deleteDocument = async (id) => {
  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Delete failed');
  }

  return response.json();
};