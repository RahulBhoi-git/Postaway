import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";

export const PostModel = mongoose.model("post", postSchema);

export default class PostRepository {
  async createPost(postData) {
    const post = new PostModel(postData);
    await post.save();
    return post;
  }

  async findAll() {
    return await PostModel.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
  }
  async findById(id) {
    return await PostModel.findById(id).populate("userId", "name email");
  }
  async update(id, updatePost) {
    return await PostModel.findByIdAndUpdate(id, updatePost, {
      new: true,
      runValidators: true,
    });
  }
  async findById(id) {
    return await PostModel.findById(id.trim()).populate("userId", "name email");
  }

  async delete(id) {
  return await PostModel.findByIdAndDelete(id);
}

}
