# Patient Portal Frontend

React frontend for the Patient Document Management Portal.

## 🚀 Quick Start

### Installation

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📋 Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:5000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── DocumentUpload.jsx
│   │   ├── DocumentUpload.css
│   │   ├── DocumentList.jsx
│   │   └── DocumentList.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Features

- ✅ Upload PDF documents (max 10MB)
- ✅ View all uploaded documents
- ✅ Download documents
- ✅ Delete documents
- ✅ Responsive design
- ✅ Real-time file validation
- ✅ Loading states
- ✅ Error handling
- ✅ Beautiful gradient UI

## 🔧 Configuration

Backend API URL is configured in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Change this if your backend runs on a different port.

## 📝 Usage

1. **Upload**: Click "Choose PDF file", select a PDF, then click "Upload Document"
2. **Download**: Click the download icon on any document card
3. **Delete**: Click the trash icon (confirms before deleting)

## ⚠️ Troubleshooting

### Connection Issues
- Make sure backend is running on port 5000
- Check CORS is enabled in backend
- Verify API_BASE_URL in `src/services/api.js`

### Upload Fails
- Only PDF files are accepted
- Maximum file size: 10MB
- Check browser console for errors

## 🎯 Tech Stack

- React 18
- Vite
- CSS3 (no frameworks)
- Fetch API

## 📄 License

MIT