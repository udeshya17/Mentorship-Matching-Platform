const express = require('express');
const validateRequest = require('../middlewares/profileValidate.middleware');
const { profileSchema } = require('../validations/profile.validation');
const profileController = require('../controllers/profile.controller');
const router = express.Router();

// Route to get the profile data
router.get('/profile/:userId', profileController.getProfile);

// Route to save or update the profile data
router.post('/profile/', validateRequest(profileSchema), profileController.saveProfile);

module.exports = router;
