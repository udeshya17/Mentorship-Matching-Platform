const UserService = require("../services/authService");
const UserServiceInstance = new UserService();

const postRegister = async (req, res) => {
  try {
    const result = await UserServiceInstance.register(req.body);
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};



module.exports = { postRegister, };
