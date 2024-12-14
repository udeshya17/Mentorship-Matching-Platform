const Notification = require('../models/notification.model'); 

const createNotification = async (userId, message, requestId) => {
  const notification = new Notification({
    userId,
    message,
    requestId,
    read: false,
    status: null,
  });
  await notification.save();
  return notification;
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
