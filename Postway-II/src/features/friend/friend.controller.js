import FriendshipRepository from "./friend.repository.js";

export default class FriendshipController {
  constructor() {
    this.friendshipRepository = new FriendshipRepository();
  }

  async sendRequest(req, res, next) {
    try {
      const user1 = req.userId;
      const user2 = req.params.recipientId;
      const result = await this.friendshipRepository.sendRequest(user1, user2);
      res.status(200).json(result, "Request sent");
    } catch (err) {
      next(err);
    }
  }
  async acceptRequest(req, res, next) {
    try {
      const requestId = req.params.id;
      const result = await this.friendshipRepository.acceptRequest(requestId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  async deleteRequest(req, res, next) {
    try {
      const requestId = req.params.id;
      const result = await this.friendshipRepository.rejectRequest(requestId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  async checkStatus(req, res, next) {
    try {
      const user1 = req.userId;
      const user2 = req.params.userId;
      const status = await this.friendshipRepository.checkStatus(user1, user2);
      res.status(200).json(status);
    } catch (err) {
      next(err);
    }
  }
  async getAllFriends(req,res,next){
    try{
        const userId=req.userId;
        const friends=await this.friendshipRepository.getAllFriends(userId);
        res.status(200).json(friends);
    }catch(err){
        next(err);
    }
  }
}
