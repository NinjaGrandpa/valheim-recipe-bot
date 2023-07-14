import FoodModel, { FoodInterface } from "../models/FoodModel";

export const getAllFoodRecipes = async (): Promise<FoodInterface[]> => {
  const foodRecipes =
    (await FoodModel.find({ name: "Raspberries" })) ||
    (await FoodModel.create({
      name: "Raspberries",
      health: 7,
      stamina: 20,
      healing: 1,
      duration: 600,
      biome: "Meadows",
      craftingStation: "None",
      recipe: ["Raspberries", "1"],
    }));

  return foodRecipes;
};
