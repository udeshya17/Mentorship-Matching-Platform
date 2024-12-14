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

    // Call the service to handle the request logic
    const request = await mentorshipService.sendMentorshipRequest(menteeId, mentorId);

    // Manually log the notification (this could also be a database insertion)
    console.log(`Notification: You have a new mentorship request from mentee ID ${menteeId}`);

    res.status(201).json({
      message: "Mentorship request sent successfully.",
      request,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    // Update the mentorship request status in the database
    const updatedRequest = await mentorshipService.updateMentorshipRequestStatus(requestId, status);

    // Notify the mentee
    const message =
      status === "accepted"
        ? "Your mentorship request was accepted"
        : "Your mentorship request was declined";
    await notificationService.createNotification(updatedRequest.menteeId, message, requestId);

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMentorshipRequestsByMentor = async (req, res) => {
  try {
    const mentorId = req.params.userid;
    const mentorshipRequests = await mentorshipService.getRequestsByMentorId(mentorId);

    if (!mentorshipRequests.length) {
      return res.status(404).json({ message: "No mentorship requests found for this mentor." });
    }

    res.status(200).json(mentorshipRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getMatchSuggestions, sendMentorshipRequest, updateRequestStatus, getMentorshipRequestsByMentor };
