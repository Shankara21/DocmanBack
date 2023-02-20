var express = require("express");
const UserController = require("../controller/UserController");
var router = express.Router();
const { verifyToken } = require("../middleware/VerifyToken");
const { refreshToken } = require("../controller/RefreshToken");

/* GET users listing. */
router.get("/", verifyToken, UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/refreshToken/:refreshToken", refreshToken);
router.delete("/logout/:refreshToken", UserController.logOut);

module.exports = router;
