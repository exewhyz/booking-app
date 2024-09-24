import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../utils/jwt.js";

export const registerController = async (req, res) => {
  // Your registration logic here

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists...Please Login",
      });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("Error generating salt: ", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to register user" });
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          console.log("Error hashing password: ", err);
          return res
            .status(500)
            .json({ success: false, message: "Failed to register user" });
        }

        // Hash the password and store it in the database.
        const user = await User.create({
          name,
          email,
          password: hash,
        });

        // Create JWT payload
        const payload = {
          userId: user._id,
        };
        const token = generateJwtToken(payload);

        return res.status(201).json({
          success: true,
          message: "Registration successful",
          data: token,
        });
      });
    });
  } catch (error) {
    console.log("Failed to register user: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email }).select("password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const hashedPassword = user.password;
    const matchPassword = await bcrypt.compare(password, hashedPassword);
    if (!matchPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const payload = {
      userId: user._id,
    };
    const token = generateJwtToken(payload);
    return res.json({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    console.log("Failed to login user: ", error);
    return res.status(500).json({
      success: false,
      message: `Failed to login user: ${error}`,
    });
  }
};

// https://github.com/exewhyz/booking-app
