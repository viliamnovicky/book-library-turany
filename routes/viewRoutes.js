const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn)

router.get('/', viewsController.getHomePage);
router.get('/databaza', viewsController.getDatabase);
router.get('/nova-kniha', authController.protect, viewsController.newBookForm);
router.get('/kontakt', viewsController.getContactPage);
router.get('/profil', authController.protect, viewsController.getProfilePage);
router.get('/admin', viewsController.getAdminPage);
router.get('/:slug', viewsController.getBookPage);

module.exports = router;
