import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async findByEmail(email){
    return UserModel.findOne({email});
  }
  async findById(id){
    return UserModel.findById(id).select('-password -tokens');
  }
  async save(user){
    return user.save();
  }
  async create(userData){
    const user=new UserModel(userData);
    await user.save();
    return user;
  }
  async updateUser(userId,update){
    return await UserModel.findByIdAndUpdate(userId,update,{
      new:true,
      runValidators:true,
    });
  }
  async updatePasswordByEmail(email,hashedPassword){
    return await UserModel.findOneAndUpdate(
      {email},
      {password:hashedPassword},
      {new:true}
    )
  }
  async updateTokens(userId,tokens){
    return UserModel.findByIdAndUpdate(userId,{tokens},{new:true});
  }

}
