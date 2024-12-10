const Users = require("../models/user.model");

class UserService {

  findByUsername = async (username) => {
    try {
      const userResult = await Users.findOne({ username });
      return userResult;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
