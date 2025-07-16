import express from "express";
import CommentController from "./comment.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/", jwtAuth,(req, res, next) =>
  commentController.addComment(req, res, next)
);

commentRouter.get("/post/:postId",(req, res, next) =>
  commentController.getCommentsByPost(req, res, next)
);
commentRouter.put("/:id",jwtAuth, (req, res, next) =>
  commentController.updateComment(req, res, next)
);
commentRouter.delete("/:id", jwtAuth,(req, res, next) => {
  commentController.deleteComment(req, res, next);
});

export default commentRouter;