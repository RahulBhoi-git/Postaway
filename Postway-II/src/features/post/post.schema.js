import mongoose from "mongoose";

export const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{
    timestamps:true
})