import express from "express";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get("/", jwtAuth,(req, res) => postController.getAllPost(req, res));
postRouter.post("/newPost", jwtAuth, upload.single("image"), (req, res, next) =>
  postController.addPost(req, res, next)
);
//update
postRouter.put("/:id",jwtAuth, (req, res, next) =>
  postController.updatePost(req, res, next)
);
postRouter.get("/:id",jwtAuth, (req, res, next) =>
  postController.getPostById(req, res, next)
);
postRouter.delete("/:id",jwtAuth,(req,res,next)=>
postController.deletePost(req,res,next));

export default postRouter;
