const { body, validationResult } = require('express-validator');

const mentorshipRequestValidation = [
  body('mentorId').notEmpty().withMessage('Mentor ID is required'),
  body('menteeId').notEmpty().withMessage('Mentee ID is required'),
  body('status').optional().isIn(['pending', 'accepted', 'declined']).withMessage('Invalid status'),
];

const validateMentorshipRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { mentorshipRequestValidation, validateMentorshipRequest };
