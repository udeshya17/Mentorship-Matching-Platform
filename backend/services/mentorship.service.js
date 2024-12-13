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
  const existingRequest = await MentorshipRequest.findOne({ menteeId, mentorId });

  if (existingRequest) {
    throw new Error('Request already exists');
  }

  const request = new MentorshipRequest({ menteeId, mentorId, status: 'pending' });
  await request.save();

  return request;
};

const updateMentorshipRequestStatus = async (requestId, status) => {
  const request = await MentorshipRequest.findById(requestId);

  if (!request) {
    throw new Error('Request not found');
  }

  request.status = status;
  await request.save();

  return request;
};

module.exports = { getMatchingProfiles, sendMentorshipRequest, updateMentorshipRequestStatus };
