const express = require('express');
const validateRequest = require('../middlewares/profileValidate.middleware');
const { profileSchema } = require('../validations/profile.validation');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

/**
 * Route to get the profile data by userId
 * GET /profile/:userId
 */
router.get('/profile/:userId', profileController.getProfile);

/**
 * Route to create a new profile
 * POST /profile
 */
router.post('/profile', validateRequest(profileSchema), profileController.createProfile);

/**
 * Route to update an existing profile by userId
 * PUT /profile/:userId
 */
router.put('/profile/:userId', validateRequest(profileSchema), profileController.updateProfile);

module.exports = router;
