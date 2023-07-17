import FoodModel, { FoodInterface } from "../models/FoodModel";

export const getFoodRecipe = async (recipeName: string): Promise<FoodInterface> => {
  const foodRecipes = (await FoodModel.findOne({name: recipeName})) || (await FoodModel.create({name: recipeName}));

  return foodRecipes;
};
