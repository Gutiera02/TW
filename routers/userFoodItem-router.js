import express from "express";
import * as  userAlimentController from '../controllers/userFoodItem-controller.js';
const router = express.Router();

router.get('/:uid/FoodItems', userAlimentController.getUserFoodItems);
router.post('/:uid/FoodItems', userAlimentController.createUserFoodItems);
router.get('/:uid/FoodItems/:aid', userAlimentController.getUserFoodItem);
router.put('/:uid/FoodItems/:aid', userAlimentController.updateUserFoodItems);
router.delete('/:uid/FoodItems/:aid', userAlimentController.deleteUserFoodItems);

export { router as userFoodItemRouter };