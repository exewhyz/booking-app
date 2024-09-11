import express from "express";
import { registerController } from "../Controller/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);

export default authRouter;
