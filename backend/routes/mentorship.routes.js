const express = require('express');
const { getMatchSuggestions, sendMentorshipRequest, updateRequestStatus, getMentorshipRequestsByMentor } = require('../controllers/mentorship.controller');
const { mentorshipRequestValidation, validateMentorshipRequest } = require('../validations/mentorship.validation');

const router = express.Router();

router.get('/match', getMatchSuggestions);
router.post('/request', mentorshipRequestValidation, validateMentorshipRequest, sendMentorshipRequest);
router.get('/request/:userid', getMentorshipRequestsByMentor); 
router.patch('/request/status', updateRequestStatus);

module.exports = router;
