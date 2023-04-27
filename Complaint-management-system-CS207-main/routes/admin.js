const express = require('express')
const passport = require('passport');
const router = express.Router();
const adminController = require('../controllers/admin_controller')

router.get('/login', adminController.login);
router.get('/admin_homepage', passport.checkadmin, adminController.home);
router.post('/update/:id', adminController.update);
router.get('/logout', adminController.destroySession);
router.post('/create-session', passport.authenticate(
    'admin',
    { failureRedirect: 'back' },
), adminController.createSession);
module.exports = router;