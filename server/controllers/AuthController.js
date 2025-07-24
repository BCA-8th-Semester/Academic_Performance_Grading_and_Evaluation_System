const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");

// === SIGNUP ===
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists. Please login.',
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true
    });

  } catch (err) {
    console.error("Signup error:", err); // ✅ log real error
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};



// === LOGIN ===
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const user = await UserModel.findOne({ email });
    const errorMsg = 'Authentication failed: Email or password is incorrect';

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Ensure JWT_SECRET is present
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined in environment');
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name
    });

  } catch (err) {
    console.error("Login error:", err); // ✅ log real error
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = {
  signup,
  login
};
