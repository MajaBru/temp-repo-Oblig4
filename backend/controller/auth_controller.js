const User = require("../models/user_schema");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registers a new user after validating the request body
const registerUser = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Respond with validation errors if any
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure and check if the provided email already exists
    const { username, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      // Prevent registration if email already exists
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password and create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user and respond
    const savedUser = await user.save();
    res
      .status(201)
      .json({ userId: savedUser._id, message: "User registered successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Logs in a user by validating credentials and generating a JWT token
const loginUser = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Respond with validation errors if any
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Handle case where user is not found
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      // Respond if password is invalid
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token
    res.cookie("authToken", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 3600000),
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Logs the user out by clearing the authentication token cookie
const logoutUser = async (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Respond with success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Fetches the role of the logged-in user
const getUserRole = async (req, res) => {
  try {
    // Respond with user role
    res.status(200).json({
      userRole: req.user.role,
      message: "Role fetched",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Verifies if a user's token is valid and returns user details
const verifyToken = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies["authToken"];
    if (!token) {
      // Handle missing token
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token and find user
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) {
      // Handle case where user is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user details
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "Token verified successfully",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserRole,
  verifyToken,
};
