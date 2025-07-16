import { ApplicationError } from "../../error-handler/applicationError.js";
import UserRepository, { UserModel } from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async register(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new ApplicationError("User already exist", 400);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        gender,
      });
      await this.userRepository.create(newUser);
      res.status(201).send(newUser,{message:'User register successfully',userId:newUser._id});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new ApplicationError("Invalid Credentials", 400);
      } else {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
          user.tokens.push(token);
          await user.save(user);
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credential");
        }
      }
    } catch (err) {
      next(err);
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  async logout(req,res,next){
    try{
        const user=await this.userRepository.findById(req.userId);
        console.log(user);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.tokens=user.tokens.filter(t=>t!==req.token);
        await user.save();
        res.status(200).json({message:'Logged out successfully'});
    }catch(err){
        next(err);
    }
  }

  async logoutAll(req,res,next){
    try{
        const user=await this.userRepository.findById(req.userId);
        user.tokens=[];
        await user.save(user);
        res.status(200).json({message:'Logged out from all devices'});
    }catch(err){
        next(err);
    }
  }

  async getProfile(req,res,next){
    try{
        const user=await this.userRepository.findById(req.userId).select('-password -tokens');
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
  }
  async updateProfile(req,res,next){
    try{
        const {name,gender}=req.body;
        await this.userRepository.updateUser(req.userId,{name,gender});
        const user=await this.userRepository.findById(req.userId);
        const updatedUser={
          _id:user._id,
          name:user.name,
          gender:user.gender,
          email:user.email
        }

        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
  }

  async uploadAvatar(req,res,next){
    try{
        const avatarPath=req.file.path;
    const user=await this.userRepository.findByIdAndUpdate(
        req.userId,
        {avatarUrl:avatarPath},
        {new:true}
    ).select('-password -tokens');
    res.status(200).json({message:'Avatar uploaded',avatarUrl:avatarPath,user});
    }catch(err){
        next(err);
    }
    
  }
}
