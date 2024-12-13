const Notification = require('../models/notification.model'); 

const createMentorshipRequestNotification = async (userId, senderId) => {
  try {
    const message = `You have a new mentorship request from ${senderId}`;
    const notification = new Notification({
      userId: userId,
      message: message,
      read: false,
    });

    await notification.save();
    console.log('Notification created:', notification);
  } catch (error) {
    console.error('Error creating notification:', error);  // Detailed error logging
  }
};
