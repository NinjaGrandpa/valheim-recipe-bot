import foodData from "./data/foods.json";
import FoodModel from "../models/FoodModel";

export const populateDatabase = async () => {
  await FoodModel.insertMany(foodData);
};
