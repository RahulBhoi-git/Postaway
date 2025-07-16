import express from 'express';
import likeRouter from './src/features/like/like.route.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { ApplicationError } from './src/error-handler/applicationError.js';
import userRouter from './src/features/user/user.route.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import postRouter from './src/features/post/post.route.js';
import commentRouter from './src/features/comment/comment.route.js';
import friendshipRouter from './src/features/friend/friend.route.js';
import resetPasswordRouter from './src/features/passwordReset/resetPassword.Route.js';

dotenv.config();
const server=express();

server.use(express.json());

server.use('/api/users',userRouter);
server.use('/api/posts',postRouter);
server.use('/api/likes',likeRouter);
server.use('/api/comments',commentRouter);
server.use('/api/friendship',friendshipRouter);
server.use('/api/resetPassword',resetPasswordRouter);
server.get('/',(req,res)=>{
    res.send('Welcome to Ecommerce APIs')
});
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    res.status(500)
    .send("Somnething went wrong ,please try later");
});
const PORT=process.env.PORT||3100;

connectUsingMongoose()
.then(()=>{
    server.listen(PORT,()=>{
        console.log("Server is running at port 3100")
    });
})
.catch(err=>{
    console.log("Failed to connect to the mongodb .server not started")
});
// server.listen(PORT,()=>{
//     console.log('Server is running at 3100');
//     connectUsingMongoose();
// })