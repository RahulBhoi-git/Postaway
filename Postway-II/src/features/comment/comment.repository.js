import { commentModel } from "./comment.schema.js";

export default class CommentRepository{
    async add(comment){
        return await commentModel.create(comment);
    }
    async findById(id){
        return await commentModel.findById(id).populate("user","name email");
    }
    async findAllByPost(postId){
        return await commentModel.find({postId}).populate("user","name email")
    }
    async update(id,content){
        return await commentModel.findByIdAndUpdate(
            id,
            {content},
            {new:true,runValidators:true}
        );
    }
    async delete(id){
        return await commentModel.findByIdAndDelete(id);
    }
}