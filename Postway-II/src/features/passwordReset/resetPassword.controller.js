import crypto from "crypto";
import nodemailer from "nodemailer";
import UserRepository from "../user/user.repository.js";
import { resetPasswordModel } from "./resetpassword.schema.js";
import bcrypt from "bcrypt";


export default class ResetPasswordController{
    constructor(){
        this.userRepository=new UserRepository();
    }    
    async requestOtp(req,res,next){
        try{
            const {email}=req.body;
            const user=await this.userRepository.findByEmail(email);

            if(!user) return res.status(404).send("User Not Found");

            const otp=Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt=new Date(Date.now()+10*60*1000);


            await resetPasswordModel.create({email,otp,expiresAt});
            const transporter=nodemailer.createTransport({
                service:"Gmail",
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS,
                },
            });
            await transporter.sendMail({
                to:email,
                subject:"Password Reset OTP",
                text:`Your OTP is ${otp}`,
            });
            res.status(200).send("OTP sent to your email");
        }catch(err){
            next(err);
        }
    }
    async verifyOtp(req,res,next){
        try{
            const {email,otp}=req.body;
            const record=await resetPasswordModel.findOne({email,otp});
            if(!record||record.expiresAt<new Date()){
                return res.status(400).send("Invalid or expired OTP")
            }
            await resetPasswordModel.deleteOne({_id:record._id});
            res.status(200).send("OTP verified successfully");
        }catch(err){
            next(err);
        }
    }
    async resetPassword(req,res,next){
        try{
            const {email,newPassword}=req.body;
            const hashedPassword=await bcrypt.hash(newPassword,10);
            await this.userRepository.updatePasswordByEmail(email,hashedPassword);

            res.status(200).send("Password reset successfully");
        }catch(err){
            next(err);
        }
    }
}