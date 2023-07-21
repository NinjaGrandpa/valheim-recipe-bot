import FoodModel, { FoodInterface } from "../models/FoodModel";

export const getAllFoodRecipes = async (
  ingredient?: string | null
): Promise<FoodInterface[]> => {
  let foodRecipes: FoodInterface[];

  if (!ingredient) {
    foodRecipes = await FoodModel.find().select("name").sort({ name: 1 });
  } else {
    foodRecipes = await FoodModel.find()
      .exists(`recipe.${ingredient}`, true)
      .select("name")
      .sort({ name: 1 });
  }
  return foodRecipes;
};
