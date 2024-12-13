const { createMentorshipRequestNotification } = require('../services/notification.service');

const createNotification = async (req, res) => {
  const { userId, senderId } = req.body;

  try {
    // Call the service to create the notification
    await createMentorshipRequestNotification(userId, senderId);
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification' });
  }
};

module.exports = { createNotification };
