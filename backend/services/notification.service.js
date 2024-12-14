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

module.exports = { createNotification };
