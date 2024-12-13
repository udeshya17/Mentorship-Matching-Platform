const profileService = require('../services/profile.service');

// Controller to get profile data by userId
const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfileByUserId(req.params.userId);
    if (!profile) {
      return res.status(404).json({ message: `No profile found for user ID: ${req.params.userId}` });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Controller to create a new profile
const createProfile = async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error: error.message });
  }
};

// Controller to update an existing profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedProfile = await profileService.updateProfile(userId, req.body);
    if (!updatedProfile) {
      return res.status(404).json({ message: `No profile found for user ID: ${userId}` });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Controller to get all user profiles
const getAllUsers = async (req, res) => {
  try {
    const users = await profileService.getAllUsers(); // Call the service to get all users
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  getAllUsers, 
};
