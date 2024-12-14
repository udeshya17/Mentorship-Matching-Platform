const Profile = require('../models/profile.model');
const MentorshipRequest = require('../models/mentorshipRequest.model');

const getMatchingProfiles = async (userId) => {
  const userProfile = await Profile.findOne({ userId });

  if (!userProfile) {
    throw new Error('User profile not found');
  }

  const potentialMatches = await Profile.find({ userId: { $ne: userId } });

  const matches = potentialMatches.map((match) => {
    const skillsMatch = userProfile.skills.filter(skill => match.skills.includes(skill)).length;
    const interestsMatch = userProfile.interests.filter(interest => match.interests.includes(interest)).length;

    const matchScore = skillsMatch + interestsMatch;
    return { match, matchScore };
  });

  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches.slice(0, 5); // Return top 5 matches
};

const sendMentorshipRequest = async (menteeId, mentorId) => {
  // Check if a request already exists between this mentee and mentor
  const existingRequest = await MentorshipRequest.findOne({ menteeId, mentorId });

  if (existingRequest) {
    throw new Error("Request already exists");
  }

  // Create a new mentorship request
  const request = new MentorshipRequest({ menteeId, mentorId, status: "pending" });
  await request.save();

  return request;
};

const updateMentorshipRequestStatus = async (requestId, status) => {
  const request = await MentorshipRequest.findById(requestId);

  if (!request) {
    throw new Error("Request not found");
  }

  request.status = status;
  await request.save();

  return request;
};

const getRequestsByMentorId = async (mentorId) => {
  try {
    const mentorshipRequests = await MentorshipRequest.find({ mentorId }).populate('menteeId mentorId');
    return mentorshipRequests;
  } catch (error) {
    throw new Error(`Error fetching mentorship requests: ${error.message}`);
  }
};

module.exports = { getMatchingProfiles, sendMentorshipRequest, updateMentorshipRequestStatus, getRequestsByMentorId };
