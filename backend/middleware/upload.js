const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { UPLOAD_PATH, MAX_FILE_SIZE } = require('../config/constants');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  console.log('📂 Uploads directory created');
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-randomstring-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
  }
});

// File filter - only allow PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['application/pdf'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: fileFilter
});

module.exports = upload;