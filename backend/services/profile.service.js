const Profile = require('../models/profile.model');

// Fetch profile by userId
const getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({ userId });
  return profile;
};

// Create or update a profile
const saveOrUpdateProfile = async (profileData) => {
  const { userId, role, skills, interests, bio } = profileData;

  // Check for duplicate profile
  const existingProfile = await Profile.findOne({ userId });
  if (existingProfile) {
    throw new Error('A profile already exists for this user');
  }

  // Save new profile or update existing one
  let profile = new Profile({ userId, role, skills, interests, bio });
  profile = await profile.save();
  return profile;
};

// Handle no matches found gracefully
const handleNoMatchesFound = (criteria) => {
  return {
    message: 'No matches found',
    suggestion: `Try broadening your criteria: ${criteria}`,
  };
};

module.exports = {
  getProfileByUserId,
  saveOrUpdateProfile,
  handleNoMatchesFound,
};
