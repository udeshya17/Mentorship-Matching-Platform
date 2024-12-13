const notificationService = require('../services/notification.service');

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationService.getNotifications(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserNotifications };
