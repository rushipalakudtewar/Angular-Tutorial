const multer = require('multer');
const path = require('path');

// Storage configuration for blog images
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/blogimages'); // Specify the storage location
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
  
const upload1 = multer({ storage: storage1 });

// Storage configuration for profile images
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileimages'); // Specify the storage location
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
  
const upload2 = multer({ storage: storage2 });

module.exports = { upload1, upload2 };