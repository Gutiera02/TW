
import express from "express";
const router = express.Router();
import * as friendController from '../controllers/friend-controller.js';

router.get('/:uid/friends', friendController.getAllFriends);
router.post('/:uid/friends', friendController.addFriend);
router.get('/:uid/friends/:usernameFriend/FoodItems', friendController.getFriendFoodItems)

export { router as friendRouter };