const mentorshipService = require('../services/mentorship.service');
const notificationService = require('../services/notification.service');

const getMatchSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;
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
