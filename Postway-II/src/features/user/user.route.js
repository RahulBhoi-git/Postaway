import express from "express";
// import { upload } from "../../middlewares/fileupload.middleware";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/register", (req, res, next) =>
  userController.register(req, res, next)
);
userRouter.post("/login", (req, res, next) =>
  userController.login(req, res, next)
);
userRouter.post("/logout", jwtAuth, (req, res) =>
  userController.logout(req, res)
);
userRouter.post("/logout-all", jwtAuth, (req, res) =>
  userController.logoutAll(req, res)
);
userRouter.get("/profile", jwtAuth, (req, res) =>
  userController.getProfile(req, res)
);
userRouter.put("/profile", jwtAuth, (req, res) =>
  userController.updateProfile(req, res)
);
userRouter.post("/avatar", jwtAuth, upload.single("avatar"), (req, res) =>
  userController.uploadAvatar(req, res)
);
export default userRouter;
