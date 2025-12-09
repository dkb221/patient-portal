const fs = require('fs').promises;
const path = require('path');

/**
 * Delete a file from the filesystem
 */
const deleteFile = async (filepath) => {
  try {
    await fs.unlink(filepath);
    console.log(`🗑️  File deleted: ${filepath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting file: ${filepath}`, error.message);
    return false;
  }
};

/**
 * Check if a file exists
 */
const fileExists = async (filepath) => {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get file size in bytes
 */
const getFileSize = async (filepath) => {
  try {
    const stats = await fs.stat(filepath);
    return stats.size;
  } catch (error) {
    console.error('Error getting file size:', error.message);
    return null;
  }
};

/**
 * Format file size to human-readable format
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

module.exports = {
  deleteFile,
  fileExists,
  getFileSize,
  formatFileSize
};