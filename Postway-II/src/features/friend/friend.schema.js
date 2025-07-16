import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["pending","accepted"],
        default:"pending"
    }
  },
  {timestamps:true}
);

friendshipSchema.index({requester:1,reciever:1},{unique:true});

export const friendshipModel=mongoose.model("friendship",friendshipSchema);
