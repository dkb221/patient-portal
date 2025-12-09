
# Patient Portal Backend API

Backend REST API for managing patient medical documents (PDFs).

## 🚀 Features

- Upload PDF documents
- List all documents
- Download documents
- Delete documents
- SQLite database
- MVC architecture
- File validation
- Error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
PORT=5000
DB_PATH=./database/database.sqlite
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
NODE_ENV=development
```

4. **Run the server**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

### 1. Upload Document
```bash
POST /documents/upload

curl -X POST http://localhost:5000/api/documents/upload \
  -F "file=@/path/to/document.pdf"

Response (201):
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "id": 1,
    "filename": "prescription.pdf",
    "filesize": 245678,
    "created_at": "2024-12-09T10:30:00.000Z"
  }
}
```

### 2. List All Documents
```bash
GET /documents

curl http://localhost:5000/api/documents

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "filename": "prescription.pdf",
      "filesize": 245678,
      "created_at": "2024-12-09T10:30:00.000Z"
    }
  ]
}
```

### 3. Download Document
```bash
GET /documents/:id

curl -O -J http://localhost:5000/api/documents/1

Response: PDF file download
```

### 4. Delete Document
```bash
DELETE /documents/:id

curl -X DELETE http://localhost:5000/api/documents/1

Response (200):
{
  "success": true,
  "message": "Document deleted successfully",
  "data": {
    "id": 1
  }
}
