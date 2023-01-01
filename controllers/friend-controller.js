
//const { User, Friend } = require("../sequelize-config");
import { User } from "../models/user-model.js";
import { Friend } from "../models/friend-model.js";


const getAllFriends = async (req, res) => {
  try {
    const Id = parseInt(req.params.uid);
    if (isNaN(Id)) {
      req
        .status(404)
        .json({ message: "User id is not a number" });
    } else {
      const user = await User.findByPk(Id);
      if (user) {
        const friends = await user.getFriends();
        res.status(200).json(friends);
      } else {
        res
          .status(404)
          .json({ message: "The user doesn't exist" });
      }
    }
  } catch (error) {
    console.warn(error);
  }
}

const addFriend = async (req, res) => {
  try {
    const Id = parseInt(req.params.uid);
    if (isNaN(Id)) {
      res
        .status(404)
        .json({ message: "User id is not a number" });
    } else {
      const user = await User.findByPk(Id);
      if (user) {
        const friend = await Friend.create(req.body);
        friend.Id = Id;
        await friend.save();
        res.status(200).json(friend);
      } else {
        res
          .status(400)
          .json({ message: "The user doesn't exist" });
      }
    }
  } catch (error) {
    console.warn(error);
  }
}

const getFriendFoodItems = async (req, res) => {
  try {
    const Id = parseInt(req.params.uid);
    const usernameFriend = req.params.usernameFriend;
    if (isNaN(Id)) {
      res
        .status(400)
        .json({ message: "User id is not a number" });
    } else {
      const user = await User.findByPk(Id);
      if (user) {
        const friends = await user.getFriends();
        friend = friends.shift();
        if (friend) {
          const userFriend = await User.findOne({
            where: { userName: usernameFriend },
          });
          if (userFriend) {
            const FoodItems = await userFriend.getFoodItems();
            res.status(200).json(FoodItems);
          } else {
            res
              .status(404)
              .json({ message: "userFriend was not found" });
          }
        } else {
          res
            .status(404)
            .json({ message: "The friend doesn't exist" });
        }
      } else {
        res
          .status(404)
          .json({ message: "The user does not exist" });
      }
    }
  } catch (error) {
    console.warn(error);
  }
}

export { getFriendFoodItems, getAllFriends, addFriend }
