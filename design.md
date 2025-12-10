# Patient Portal - Design Document

## 1. Tech Stack Choices

### Q1. Frontend Framework: **React (Vite)**
- **Component-based architecture** for reusable UI elements
- **Virtual DOM** for efficient rendering
- **Modern tooling** with Vite for fast development
- Built-in state management with hooks sufficient for this scope

### Q2. Backend Framework: **Express.js (Node.js)**
- **Lightweight and fast** for building REST APIs
- **JavaScript full-stack** reduces context switching
- **Rich middleware ecosystem** (Multer for uploads, CORS)
- Non-blocking I/O handles file operations efficiently

### Q3. Database: **SQLite**
- **Zero configuration** - no separate database server needed
- **File-based** - entire database is a single portable file
- **ACID compliant** ensures data integrity
- **Perfect for local development** and this project scope

### Q4. Scaling to 1,000 Users - Key Changes

**Database**: Migrate to **PostgreSQL** for better concurrent writes and connection pooling

**File Storage**: Move to **AWS S3/Cloud Storage**
- Unlimited storage capacity
- CDN integration for faster downloads
- Reduced server load

**Authentication**: Implement **JWT-based auth** with user sessions and multi-tenancy

**Performance**:
- Add Redis caching layer
- Implement pagination
- Load balancer with multiple backend instances
- Database indexing on user_id and created_at

**Security**:
- Rate limiting (e.g., 10 uploads/hour per user)
- File encryption at rest
- Virus/malware scanning
- HIPAA compliance measures

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           React Frontend (Vite)                 │
│   Header | DocumentUpload | DocumentList        │
│              ↓ api.js ↓                         │
└───────────────────┬─────────────────────────────┘
                    │ HTTP REST API
                    ↓
┌─────────────────────────────────────────────────┐
│         Express.js Backend (Port 5000)          │
│                                                  │
│  Middleware → Routes → Controllers → Models     │
│  (CORS, Multer, Validation)                     │
└───────────┬────────────────────┬─────────────────┘
            │                    │
            ↓                    ↓
   ┌────────────────┐   ┌──────────────┐
   │ SQLite Database│   │  File System │
   │                │   │  /uploads/   │
   │ documents table│   │  (PDF files) │
   └────────────────┘   └──────────────┘
```

**Flow**: Frontend → API → Routes → Controllers → Models → Database/FileSystem

---

## 3. API Specification

**Base URL**: `http://localhost:5000/api`

### 1. Upload Document
```
POST /documents/upload
Content-Type: multipart/form-data
Body: file=[PDF Binary Data]
```
**Request**:
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -F "file=@prescription.pdf"
```
**Response (201)**:
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "id": 1,
    "filename": "prescription.pdf",
    "filesize": 245678,
    "created_at": "2024-12-10T10:30:00.000Z"
  }
}
```

### 2. List All Documents
```
GET /documents
```
**Request**:
```bash
curl http://localhost:5000/api/documents
```
**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "filename": "prescription.pdf",
      "filesize": 245678,
      "created_at": "2024-12-10T10:30:00.000Z"
    }
  ]
}
```

### 3. Download Document
```
GET /documents/:id
```
**Request**:
```bash
curl -O -J http://localhost:5000/api/documents/1
```
**Response**: PDF file download (200)

### 4. Delete Document
```
DELETE /documents/:id
```
**Request**:
```bash
curl -X DELETE http://localhost:5000/api/documents/1
```
**Response (200)**:
```json
{
  "success": true,
  "message": "Document deleted successfully",
  "data": { "id": 1 }
}
```

**Error Codes**:
- `400`: Bad Request (invalid file/no file)
- `404`: Document not found
- `413`: File too large (>10MB)
- `500`: Server error

---

## 4. Data Flow Description

### Q5. Upload Process
1. User selects PDF in React component
2. Frontend validates file type and size (<10MB)
3. POST request sent with FormData to `/api/documents/upload`
4. Multer middleware intercepts and saves file to `./uploads/`
5. ValidatePDF middleware checks extension and MIME type
6. Controller extracts metadata and calls Model
7. Model inserts record into SQLite database
8. Response sent back with document metadata
9. Frontend refreshes document list

### Download Process
1. User clicks download button
2. GET request to `/api/documents/:id`
3. Controller queries database for document metadata
4. Verifies file exists on disk
5. Express streams file with `Content-Disposition: attachment`
6. Browser receives binary data and triggers download
7. Frontend creates temporary link and clicks it programmatically

---

## 5. Assumptions

### Q6. Key Assumptions Made

1. **Single User**: No authentication required (per assignment specs)
2. **File Size**: Maximum 10MB per file (prevents memory exhaustion)
3. **File Type**: PDF only (assignment requirement, simplifies security)
4. **Local Storage**: Files in `./uploads/` directory (not production-ready)
5. **No Concurrency**: Low traffic expected (SQLite handles this fine)
6. **No Versioning**: Files cannot be updated, only created/deleted
7. **Hard Deletes**: Permanent deletion (no soft delete/audit trail)
8. **Auto Cleanup**: Orphan files deleted if database insert fails
9. **No Encryption**: Files stored unencrypted (would need for HIPAA)
10. **Modern Browsers**: ES6+ support required (no IE11)
11. **Development Mode**: Missing production features (HTTPS, rate limiting, monitoring)
12. **No Data Retention**: Database grows indefinitely (no auto-cleanup)

---

## Database Schema

```sql
CREATE TABLE documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  filepath TEXT NOT NULL,
  filesize INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_created_at ON documents(created_at DESC);
```

---

## Summary

| Aspect | Choice | Why |
|--------|--------|-----|
| Frontend | React + Vite | Fast, component-based, modern |
| Backend | Express.js | Lightweight, JS full-stack |
| Database | SQLite | Zero-config, portable |
| File Upload | Multer | Standard Express middleware |
| Storage | Local filesystem | Simple for demo/local dev |

**Future Enhancements**: User auth, cloud storage, search, PDF preview, batch upload, real-time updates