import foodData from "./data/foods.json";
import FoodModel from "../models/FoodModel";

export const populateDatabase = async () => {
  foodData.forEach(async (food) => {
    if (!(await FoodModel.exists(food))) {
      console.log(`Creating new document ${food.name}`);
      await FoodModel.create(food);
    }
  });
};
