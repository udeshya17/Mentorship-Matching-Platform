const express = require('express');
const { getMatchSuggestions, sendMentorshipRequest, updateRequestStatus } = require('../controllers/mentorship.controller');
const { mentorshipRequestValidation, validateMentorshipRequest } = require('../validations/mentorship.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/match', authMiddleware, getMatchSuggestions);
router.post('/request', authMiddleware, mentorshipRequestValidation, validateMentorshipRequest, sendMentorshipRequest);
router.patch('/request/status', authMiddleware, updateRequestStatus);

module.exports = router;
