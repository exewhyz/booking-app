import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        // Define JWT secret key
        const secretKey = process.env.SECRET_KEY;

        // Define JWT algorithm
        const algorithm = { algorithm: "HS256" };

        // Generate JWT token
        const token = jwt.sign(payload, secretKey, algorithm);

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

// https://github.com/exewhyz/booking-app
