const jwt = require('jsonwebtoken');
const Profile = require('../models/profile.model');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your JWT secret key
    const user = await Profile.findOne({ userId: decoded.id });

    if (!user) {
      return res.status(401).json({ message: 'User not found or unauthorized' });
    }

    req.user = decoded; // Attach user information from the token to the request object
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
