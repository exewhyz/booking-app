import { verifyJwtToken } from "../utils/jwt.js";

const verifyUserMiddleware = (req, res, next) => {
  const token = req.header("token");
  // Verify token using JWT
  const payload = verifyJwtToken(token);
  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Invald Credentials...Please Login Again",
    });
  }
  req.user = payload;
  next();
};

export default verifyUserMiddleware;
