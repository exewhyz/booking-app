import express from "express";
import {
  getUserController,
  loginController,
  registerController,
} from "../Controller/authController.js";
import verifyUserMiddleware from "../middleware/verifyUser.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/user", verifyUserMiddleware, getUserController);

export default authRouter;
