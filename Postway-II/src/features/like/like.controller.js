import { LikeRepository } from "./like.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async toggleLike(req, res, next) {
    try {
      const userId = req.userId;
      const { targetId, type } = req.body;
        if(!targetId||!type){
            return res.status(400).json({success:false,message:"targetId and type is required"});
        }
      const existing = await this.likeRepository.isLiked(
        userId,
        targetId,
        type
      );
      if (existing) {
        await this.likeRepository.unlike(userId, targetId, type);
        return res.status(200).json({ liked: false });
      } else {
        await this.likeRepository.like(userId, targetId, type);
        return res.status(200).json({ liked: true });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }
  async getLikes(req,res,next){
    try{
        const {targetId,type}=req.body;
        const count=await this.likeRepository.getLikesCount(targetId,type);
        res.status(200).json({likes:count});
    }catch(err){
        next(err);
    }
  }
}
