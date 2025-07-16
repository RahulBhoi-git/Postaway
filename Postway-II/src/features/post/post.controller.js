import { ApplicationError } from "../../error-handler/applicationError.js";
import PostRepository, { PostModel } from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getAllPost(req, res) {
    try {
      const post = await this.postRepository.findAll();
      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }
  async addPost(req, res) {
    try {
      const { caption } = req.body;
      const userId = req.userId;
      const imageUrl = req.file ? req.file.path : null;
      const newPost = await this.postRepository.createPost({
        caption,
        imageUrl,
        userId,
      });
      res.status(201).json(newPost);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }
  async getPostById(req, res, next) {
    try {
      const id = req.params.id.trim();
      const post = await this.postRepository.findById(id);
      console.log(post);
      if (!post) throw new ApplicationError("post not found", 404);
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
      next(err);
      return res.status(400).send("Something went wrong");
    }
  }
  async updatePost(req, res, next) {
    try {
      const id = req.params.id.trim();
      const post = await this.postRepository.findById(id);
      if (!post) throw new ApplicationError("Post not found", 404);

      const updated = await this.postRepository.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async deletePost(req, res, next) {
    try {
      const id = req.params.id.trim();
      const post = await this.postRepository.findById(id);
      console.log(post);
      console.log("post.userId:", post.userId.toString());
      console.log("req.userId:", req.userId);

      if (!post) throw new ApplicationError("Post not found", 404);

      if (post.userId._id.toString() !== req.userId) {
        throw new ApplicationError("Unauthorized", 403);
      }

      await this.postRepository.delete(id);
      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
