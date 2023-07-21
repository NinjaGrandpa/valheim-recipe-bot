import FoodModel from "../models/FoodModel";

export const getAllIngredients = async () => {
  const ingredientMaps = (await FoodModel.find().select("recipe")).map(
    (i) => i.recipe
  );

  const ingredients: Array<string> = [];

  ingredientMaps.forEach((ingredientMap?) => {
    if (!ingredientMap) return;
    for (const ingredient of ingredientMap.keys()) {
      if (ingredients.includes(ingredient) || ingredient == "None") return;

      ingredients.push(ingredient);
    }
  });

  return ingredients;
};
