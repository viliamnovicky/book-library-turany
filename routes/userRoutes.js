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

router.patch(
    '/updateMe',
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
);

router.get("/me/userBooks", userController.getUsersSortedBooks)
router.patch("/updatePassword", authController.updatePassword)

module.exports = router