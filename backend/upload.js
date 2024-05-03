
// https://www.npmjs.com/package/multer
// https://dev.to/aimalm/upload-single-file-in-node-js-using-express-and-multer-in-6-steps-4o9p
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(new Error('only SVG files are allowed'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter});


module.exports = upload;