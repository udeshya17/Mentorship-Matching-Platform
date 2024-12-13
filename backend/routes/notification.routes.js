const express = require('express');
const { getUserNotifications } = require('../controllers/notification.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/notifications', authMiddleware, getUserNotifications);

module.exports = router;
