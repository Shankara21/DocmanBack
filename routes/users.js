var express = require("express");
const UserController = require("../controller/UserController");
var router = express.Router();
const { verifyToken } = require("../middleware/VerifyToken");
const { refreshToken } = require("../controller/RefreshToken");

/* GET users listing. */
router.get("/",  UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/refreshToken", refreshToken);
router.delete("/logout/:refreshToken", UserController.logOut);
router.get("/:id", UserController.showUser)
router.put("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)

module.exports = router;
