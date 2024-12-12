const profileService = require('../services/profile.service');
const { handleNoMatchesFound } = profileService;

// Controller to get profile data
const getProfile = async (req, res) => {
  const profile = await profileService.getProfileByUserId(req.params.userId);
  if (!profile) {
    return res.status(404).json(handleNoMatchesFound('user ID'));
  }
  res.status(200).json(profile);
};

// Controller to save or update profile data
const saveProfile = async (req, res) => {
  const profile = await profileService.saveOrUpdateProfile(req.body);
  res.status(200).json(profile);
};

module.exports = {
  getProfile,
  saveProfile,
};
