import jwt from "jsonwebtoken";

export const generateJwtToken = (payload) => {
  // Define JWT secret key
  const secretKey = process.env.SECRET_KEY;

  try {
    const token = jwt.sign(payload, secretKey);
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export const verifyJwtToken = (token) => {
  // Define JWT secret key
  const secretKey = process.env.SECRET_KEY;

  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
