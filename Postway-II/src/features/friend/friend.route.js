import express from "express";
import FriendshipController from "./friend.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const friendshipRouter = express.Router();
const friendshipController = new FriendshipController();

friendshipRouter.post("/request/:recipientId",jwtAuth, (req, res, next) =>
  friendshipController.sendRequest(req, res, next)
);
friendshipRouter.post("/accept/:requesterId",jwtAuth,(req, res, next) =>
  friendshipController.acceptRequest(req, res, next)
);

friendshipRouter.delete("/:userId", jwtAuth,(req, res, next) =>
  friendshipController.deleteRequest(req, res, next)
);

friendshipRouter.get("/all",jwtAuth, (req, res, next) =>
  friendshipController.getAllFriends(req, res, next)
);

friendshipRouter.get("/check/:userId",jwtAuth, (req, res, next) =>
  friendshipController.checkStatus(req, res, next)
);

export default friendshipRouter;