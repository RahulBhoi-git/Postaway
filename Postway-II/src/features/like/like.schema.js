import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId,
     ref: "User",
    required:true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required:true },
  type:{
    type:String,
    enum:["Post","Comment"],
    required:true,
  },
},
{timestamps:true}
);
likeSchema.index({userId:1,targetId:1,type:1},{unique:true});

export const LikeModel=mongoose.model("like",likeSchema);