var express = require("express");
const CategoryController = require("../controller/Category.controller");

var router = express.Router();

/* GET home page. */
router.get("/", CategoryController.index);
router.get("/:name", CategoryController.filterByName);

module.exports = router;
