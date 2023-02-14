var express = require("express");
const DocumentController = require("../controller/Document.controller");
var router = express.Router();

/* GET home page. */
router.get("/", DocumentController.index);

module.exports = router;
