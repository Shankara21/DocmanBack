var express = require("express");
const DocumentController = require("../controller/Document.controller");
var router = express.Router();

const multer = require("multer");
const { verifyToken } = require("../middleware/VerifyToken");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) { 
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });
/* GET home page. */
router.post("/selectExp", DocumentController.selectExp);
router.get("/:id", DocumentController.index);
router.post("/", upload.single("linkDoc"), DocumentController.create);
router.post("/store", DocumentController.storeDocument);
router.get("/count/document", DocumentController.countDocument);

module.exports = router;
