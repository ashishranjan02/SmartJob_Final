
import multer from "multer";
const storage = multer.memoryStorage();

//  file filter (resume: pdf/docx, photo: image)
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type for resume! Only PDF/DOCX allowed."), false);
    }
  } else if (file.fieldname === "photo") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type for photo! Only images allowed."), false);
    }
  } else {
    cb(new Error("Unknown field"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
