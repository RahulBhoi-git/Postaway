import mongoose from "mongoose";

const resetPasswordSchema=new mongoose.Schema(
    {
        email:{type:String,required:true},
        otp:{type:String,required:true},
        expiresAt:{type:Date,required:true},
    },
    {timestamps:true}
);

export const resetPasswordModel=mongoose.model("otp",resetPasswordSchema);