const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

// Protected routes
router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser)
router.get("/updateMe", userController.getMe, userController.updateUser)
router.get("/me/userBooks", userController.getUsersSortedBooks)

module.exports = router