const express = require('express');
const { Notification, fetchNotifications } = require('../controllers/notification.controller');

const router = express.Router();

// Route to create a new mentorship request notification
router.post('/notifications', Notification);
router.get('/notifications/:userId', fetchNotifications);

module.exports = router;
