import express from "express";
//const FoodItemsController = require('../controllers/FoodItems-controller.js');
import * as FoodItemsController from '../controllers/FoodItems-controller.js';
const router = express.Router();

router.get('/', FoodItemsController.getFoodItems);
router.post('/', FoodItemsController.createFoodItems);
router.get('/:aid', FoodItemsController.getFoodItem);
router.put('/:aid', FoodItemsController.updateFoodItems);
router.delete('/:aid', FoodItemsController.deleteFoodItems);
export { router as FoodItemsRouter };