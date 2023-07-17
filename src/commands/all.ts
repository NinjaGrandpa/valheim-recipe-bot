import { Command } from "../interfaces/Command";
import { getAllFoodRecipes } from "../modules/getAllFoodRecipes";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const all: Command = {
  data: new SlashCommandBuilder()
    .setName("all")
    .setDescription("Shows all the available recipes."),
  run: async (interaction) => {
    await interaction.deferReply();

    const foodRecipes = await getAllFoodRecipes();
    const recipeEmbed = new EmbedBuilder()
      .setTitle("All Food Recipes")
      .setDescription(`Showing all ${foodRecipes.length} food recipes`);

    let foodNames = "";

    foodRecipes.forEach(food => {
        foodNames += `${food.name}\n`;
    });

    recipeEmbed.addFields(
        {
            name: "Food Recipes",
            value: foodNames
        }
    );

    await interaction.editReply({ embeds: [recipeEmbed] });
  },
};
