import FoodModel, { FoodInterface } from "../models/FoodModel";

export const getFoodRecipe = async (recipeName: string): Promise<FoodInterface | null> => {
  const foodRecipes = (await FoodModel.findOne({name: recipeName}));

  return foodRecipes;
};
