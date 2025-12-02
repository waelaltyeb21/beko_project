const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const storage = multer.memoryStorage();

// 5242880 => 5 MB
const FILE_LIMIT = process.env.FILE_LIMIT_TO_UPLOAD || 1024 * 1024 * 5;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(new Error("Invalid file type. Only images are allowed."), false);
  }

  // Additional security check for file signature
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    return cb(new Error("Invalid file extension."), false);
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_LIMIT,
  },
  fileFilter,
});

const UPLOAD_PATHS = {
  product: "products",
  default: "images",
};

const ResizeTheImage = async (file) => {
  const originalName = path.parse(file.originalname).name;
  const FileName = `${originalName}.webp`;
  const Folder = UPLOAD_PATHS[file.fieldname] || UPLOAD_PATHS["default"];
  let filePath = path.join(__dirname, "..", "uploads", Folder);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  await sharp(file.buffer)
    .resize(1080, 1080, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(path.join(filePath, FileName));

  return { FileName };
};

const DeleteFile = (fileName, folderName) => {
  const filePath = path.join(__dirname, "..", "uploads", folderName, fileName);
  if (fs.existsSync(filePath)) {
    const deleteTheFile = fs.unlinkSync(filePath);
    return deleteTheFile;
  }
};

module.exports = { upload, ResizeTheImage, DeleteFile };
