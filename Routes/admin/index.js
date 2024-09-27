import express from "express";
import {
  createHomeController,
  getHomesController,
} from "../../Controller/homesController.js";
import verifyUserMiddleware from "../../middleware/verifyUser.js";
import verifyUserRoleIsAdminMiddleware from "../../middleware/verifyRole.js";

const adminRouter = express.Router();

adminRouter
  .get("/homes", verifyUserMiddleware, getHomesController)
  .post(
    "/homes",
    verifyUserMiddleware,
    verifyUserRoleIsAdminMiddleware,
    createHomeController
  );

export default adminRouter;
