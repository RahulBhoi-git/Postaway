import express from "express";
import { LikeController } from "./like.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/toggle",jwtAuth, (req, res, next) =>
  likeController.toggleLike(req, res, next)
);
likeRouter.get("/", (req, res, next) => {
  likeController.getLikes(req, res, next);
});

export default likeRouter;
