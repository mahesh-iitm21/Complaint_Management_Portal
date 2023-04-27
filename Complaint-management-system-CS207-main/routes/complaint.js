const express = require('express')
const router = express.Router();
const complaintController = require('../controllers/complaint_controller');
const passport = require('passport');

router.post('/create', complaintController.create);

module.exports = router;