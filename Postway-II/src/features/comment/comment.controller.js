import { ApplicationError } from "../../error-handler/applicationError.js";
import CommentRepository from "./comment.repository.js";



export default class CommentController{
    
    constructor(){
        this.commentRepository=new CommentRepository();
    }

    async addComment(req,res,next){
        try{
            const {postId,content}=req.body;
            const userId=req.userId;

            const newComment=await this.commentRepository.add({
                user:userId,
                postId,
                content,
            });
            res.status(200).json(newComment);
        }catch(err){
            next(err);
        }
    }
    async getCommentsByPost(req,res,next){
        try{
            const postId=req.params.postId;
            const comments=await this.commentRepository.findAllByPost(postId);
            res.status(200).send(comments); 
        }catch(err){
            next(err);
        }
    }
    async updateComment(req,res,next){
        try{
            const comments=await this.commentRepository.findById(req.params.id);
            if(!comments) throw new ApplicationError("Comment not found",404);
            if(comments.user._id.toString()!==req.userId){
                throw new ApplicationError("Unauthorized",403);
            }
            const updated=await this.commentRepository.update(req.params.id,req.body.content);
            res.status(200).json(updated)
        }catch(err){
            next(err);
        }
    }
    async deleteComment(req,res,next){
        try{
            const comments=await this.commentRepository.findById(req.params.id);
            if(!comments) throw new ApplicationError("Comment not found",404);
            if(comments.user._id.toString()!==req.userId){
                throw new ApplicationError("Unauthorized",403);
            }
            await this.commentRepository.delete(req.params.id);
            res.status(200).json({message:"Comment Delete"});
        }catch(err){
            next(err);
        }
    }
}