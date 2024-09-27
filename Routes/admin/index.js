import express from "express";
import { getHomesController } from "../../Controller/homesController.js";
import verifyUserMiddleware from "../../middleware/verifyUser.js";

const adminRouter = express.Router();

adminRouter.get("/homes", verifyUserMiddleware, getHomesController)

export default adminRouter;
