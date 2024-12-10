const Users = require("../models/user.model");

class UserService {
  register = async (user) => {
    try {
      const { username, email, password } = user;
      const newUser = new Users({ username, email, password });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  
}

module.exports = UserService;
