import multer from "multer";

const storage_profile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const storage_courses = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/courses');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const storage_lessons = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/lessons');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload_profile = multer({ storage: storage_profile });
export const upload_courses = multer({ storage: storage_courses });
export const upload_lessons = multer({ storage: storage_lessons });
