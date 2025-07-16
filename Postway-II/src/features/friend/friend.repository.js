import { friendshipModel } from "./friend.schema.js";

export default class FriendshipRepository {
  async sendRequest(senderId, recieverId) {
    const existing = await friendshipModel.findOne({
      $or: [
        { requester: senderId, reciever: recieverId },
        { requester: recieverId, reciever: senderId },
      ],
    });
    if (existing) {
      throw new Error(
        "Friend request already exists or you're already friends"
      );
    }
    const request = await friendshipModel({
      requester: senderId,
      reciever: recieverId,
      status: "pending",
    });
    return await request.save();
  }
  async acceptRequest(requestId) {
    return await friendshipModel.findOneAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true }
    );
  }
  async rejectRequest(requestId) {
    return await friendshipModel.findOneAndDelete(
      requestId,
    );
  }
  async checkStatus(user1, user2) {
    const friendship= await friendshipModel.findOne({
      $or: [
        { requester:user1,reciever:user2 },
        { requester: user2, reciever: user1 },
      ],
    });
    if(!friendship){
        return {status:"none"};
    }
    return {status:friendship.status};
  }
  async getAllFriends(userId) {

    const friendship= await friendshipModel
      .find({
        $or: [{ requester: userId }, { reciever: userId }],
        status: "accepted",
      })
      .populate("user1 user2", "name email");

      const friends =friendship.map((f)=>
    f.requester._id.toString()===userId?f.reciever:f.requester
    );
    return friends;
  }
}
