import jwt from "jsonwebtoken";

export const generateJwtToken = (payload) => {
  // Define JWT secret key
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign(payload, secretKey);
  return token;
};
