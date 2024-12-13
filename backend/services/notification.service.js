const Notification = require('../models/notification.model');

const createNotification = async (userId, message) => {
  const notification = new Notification({ userId, message });
  await notification.save();

  return notification;
};

const getNotifications = async (userId) => {
  return await Notification.find({ userId });
};

module.exports = { createNotification, getNotifications };
