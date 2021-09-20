const path = require("path");
const multer = require("multer");
const express = require("express");
const router = express.Router();
//những loại file nào được phép gửi lên sever
const fileExtendsions = {
    "image/jpeg": ".jpg",
    "audio/mpeg": "mp3"
}

//cấu hình nơi lưu trữ file
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../static"))
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + '-' + Date.now() + fileExtendsions[file.mimetype];
        req.savedFile = fileName;
        cb(null, fileName);
    }
});
const upload = multer({ storage: diskStorage })
module.exports = upload;

router.post("/", upload.single("file"), (req, res) => {
    res.json({ filePath: "/static/" + req.savedFile })
})
module.exports = router;