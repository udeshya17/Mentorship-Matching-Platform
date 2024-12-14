const Notification = require('../models/notification.model'); 

const createNotification = async (userId, message) => {
  try {
    const notification = new Notification({
      userId: userId,
      message: message,
      read: false,
    });

    await notification.save();
    console.log('Notification created:', notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new Error('Error creating notification');
  }
};

const getNotificationsByUserId = async (userId) => {
  try {
    return await Notification.find({ userId }).exec();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
};

module.exports = { createNotification, getNotificationsByUserId };
