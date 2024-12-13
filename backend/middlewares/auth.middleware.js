const Profile = require("../models/profile.model");

const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return unauthorized error
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
   
    req.token = token;

    // You can proceed with user lookup or other tasks, skipping JWT verification
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    // Return a general error if needed
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
