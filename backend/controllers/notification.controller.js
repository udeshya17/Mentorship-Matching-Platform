const { createNotification, getNotificationsByUserId } = require('../services/notification.service');

const Notification = async (req, res) => {
  const { userId, senderId } = req.body;

  try {
    // Call the service to create the notification
    await createNotification(userId, senderId);
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification' });
  }
};

const fetchNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await getNotificationsByUserId(userId);

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

module.exports = { Notification, fetchNotifications };
