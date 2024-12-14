const mentorshipService = require('../services/mentorship.service');
const notificationService = require('../services/notification.service');

const getMatchSuggestions = async (req, res) => {
  try {
    // Extract `userId` dynamically from query params or request body
    const userId = req.query.userId || req.body.userId;

    // If `userId` is not provided, return an error
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch matching profiles using the userId
    const matches = await mentorshipService.getMatchingProfiles(userId);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMentorshipRequest = async (req, res) => {
  try {
    const { menteeId, mentorId } = req.body;
    const request = await mentorshipService.sendMentorshipRequest(menteeId, mentorId);

    // Notify the mentor
    await notificationService.createNotification(mentorId, `You have a new mentorship request from ${menteeId}`);

    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const updatedRequest = await mentorshipService.updateMentorshipRequestStatus(requestId, status);

    // Notify the mentee
    const message = status === 'accepted' ? 'Your mentorship request was accepted' : 'Your mentorship request was declined';
    await notificationService.createNotification(updatedRequest.menteeId, message);

    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMatchSuggestions, sendMentorshipRequest, updateRequestStatus };
