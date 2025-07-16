import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    gender:{type:String,enum:['Male','Female','Other']},
    avatarUrl:{type:String},
    tokens:[String]
},{timeStamps:true});

