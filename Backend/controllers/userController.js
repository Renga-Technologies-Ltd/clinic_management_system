const bcrypt = require("bcrypt");
const User = require("../schemas/users");

const userController = {
    registerUser: async (req, res, next) => {
    try {
      const { username, password, roles, profile } = req.body;
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username is already taken" });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        roles,
        profile,
      });
      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // Add more controller methods as needed
};

module.exports = userController;
