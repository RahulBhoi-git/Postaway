import mongoose from 'mongoose';
import { LikeModel } from './like.schema.js';


export class LikeRepository{
    
    async like(userId,targetId,type){
        return await LikeModel.create({user:userId,targetId,type});
    }
    async unlike(userId,targetId,type){
        return await LikeModel.findOneAndDelete({user:userId,targetId,type});
    }
    async isLiked(userId,targetId,type){
        return await LikeModel.findOne({user:userId,targetId,type});
    }
    async getLikesCount(targetId,type){
        return await LikeModel.countDocuments({targetId,type});
    }
}