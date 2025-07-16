import express from "express";
import ResetPasswordController from "./resetPassword.controller.js";

const resetPasswordRouter = express.Router();
const resetController = new ResetPasswordController();

resetPasswordRouter.post("/request-otp", (req, res, next) =>
  resetController.requestOtp(req, res, next)
);

resetPasswordRouter.post("/verify-otp", (req, res, next) =>
  resetController.verifyOtp(req, res, next)
);

resetPasswordRouter.post("/reset-password", (req, res, next) =>
  resetController.resetPassword(req, res, next)
);

export default resetPasswordRouter;
