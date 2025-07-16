import { resetPasswordModel } from "./resetpassword.schema.js";
import { UserModel } from "../user/user.repository.js";
import bcrypt from "bcrypt";
export class resetPasswordRepository{

    async generateOTP(email,otp){
        await resetPasswordModel.deleteMany({email});

        return await resetPasswordModel.create({
            email,
            otp,
            createdAt:new Date(),
        });
    }

    async verifyOTP(email,otp){
        const record=await resetPasswordModel.findOne({
            email,otp
        });
        if(!record){
            throw new Error("Invalid OTP");
        }
        const now=new Date();
        const expiry=new Date(record.createdAt);
        expiry.setMinutes(expiry.getMinutes()+10);

        if(now>expiry){
            await resetPasswordModel.deleteOne({
                _id:record._id
            });
            throw new Error("OTP Expired");
        }
        return true;
    }

    async updatePassword(email,newPassword){
        const hashed=await bcrypt.hash(newPassword,10);
        const user=await UserModel.findOneAndUpdate(
            {email},
            {password:hashed},
            {new:true}
        );
        if(!user) throw new Error("User not found");

        await resetPasswordModel.deleteMany({email});
    }
}