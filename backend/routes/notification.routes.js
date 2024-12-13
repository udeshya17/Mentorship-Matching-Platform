const express = require('express');
const { createNotification } = require('../controllers/notification.controller');

const router = express.Router();

// Route to create a new mentorship request notification
router.post('/notifications', createNotification);

module.exports = router;
