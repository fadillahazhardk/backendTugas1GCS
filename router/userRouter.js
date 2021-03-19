const express = require("express");

const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

const router = express.Router();

router.post("/checkIdentifier", userController.checkIdentifier);

router.post("/signup", authController.signup)
router.post("/login", authController.login)

router.route("/").get(userController.findAllUser);
router.route("/:id").get(userController.findUser).delete(userController.deleteUser)

module.exports = router;
