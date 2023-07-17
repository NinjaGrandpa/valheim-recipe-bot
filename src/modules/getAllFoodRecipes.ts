import FoodModel, { FoodInterface } from "../models/FoodModel";

export const getAllFoodRecipes = async (): Promise<FoodInterface[]> => {
  const foodRecipes = await FoodModel.find().select("name");

  return foodRecipes;
};
