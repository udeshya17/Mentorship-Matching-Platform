const Profile = require('../models/profile.model');

// Fetch profile by userId
const getProfileByUserId = async (userId) => {
  return await Profile.findOne({ userId });
};

// Create a new profile
const createProfile = async (profileData) => {
  const { userId, role, skills, interests, bio } = profileData;

  // Check if a profile already exists
  const existingProfile = await Profile.findOne({ userId });
  if (existingProfile) {
    throw new Error('A profile already exists for this user');
  }

  // Create and save the new profile
  const profile = new Profile({ userId, role, skills, interests, bio });
  return await profile.save();
};

// Update an existing profile
const updateProfile = async (userId, profileData) => {
  // Check if the profile exists
  const existingProfile = await Profile.findOne({ userId });
  if (!existingProfile) {
    throw new Error('Profile not found for the given user ID');
  }

  // Update the profile
  Object.assign(existingProfile, profileData);
  return await existingProfile.save();
};

// Fetch all user profiles
const getAllUsers = async () => {
  try {
    return await Profile.find(); // Fetch all profiles
  } catch (error) {
    throw new Error('Error fetching all users: ' + error.message);
  }
};

// Handle no matches found gracefully
const handleNoMatchesFound = (criteria) => {
  return {
    message: 'No matches found',
    suggestion: `Try broadening your criteria: ${criteria}`,
  };
};

// Method for filtering users by role, skills, and interests
const filterUsers = async (filters) => {
  try {
    const { role, skills, interests } = filters;

    // Build the filter query object
    const filterQuery = {};
    if (role) filterQuery.role = role;
    if (skills) filterQuery.skills = { $in: skills };
    if (interests) filterQuery.interests = { $in: interests };

    // Fetch filtered users based on criteria
    const users = await Profile.find(filterQuery);
    if (users.length === 0) {
      return handleNoMatchesFound(JSON.stringify(filters));
    }
    return users;
  } catch (error) {
    throw new Error('Error filtering users: ' + error.message);
  }
};

module.exports = {
  getProfileByUserId,
  createProfile,
  updateProfile,
  getAllUsers,
  handleNoMatchesFound,
  filterUsers, 
};
