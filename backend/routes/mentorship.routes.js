const express = require('express');
const { getMatchSuggestions, sendMentorshipRequest, updateRequestStatus } = require('../controllers/mentorship.controller');
const { mentorshipRequestValidation, validateMentorshipRequest } = require('../validations/mentorship.validation');

const router = express.Router();

router.get('/match', getMatchSuggestions);
router.post('/request', mentorshipRequestValidation, validateMentorshipRequest, sendMentorshipRequest);
router.patch('/request/status', updateRequestStatus);

module.exports = router;
