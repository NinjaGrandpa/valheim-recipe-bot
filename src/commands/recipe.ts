import { Command } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { getFoodRecipe } from "../modules/getFoodRecipe";
import { EmbedBuilder } from "discord.js";

export const recipe: Command = {
  data: new SlashCommandBuilder()
    .setName("recipe")
    .setDescription("Shows information on the searched recipe.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Input the name of a food item")
        .setRequired(true)
    ),

  run: async (interaction) => {
    await interaction.deferReply();

    const nameInput = interaction.options.get("name", true);
    console.log(nameInput.value);
    
    const foodRecipes = await getFoodRecipe(nameInput.value as string);

    const recipeEmbed = new EmbedBuilder()
      .setTitle("Food Recipe")
      .setDescription(`Showing Recipe for ${foodRecipes.name}`)
      .addFields(
        {
          name: "Name",
          value: foodRecipes.name,
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        },
        {
          name: "Health",
          value: foodRecipes.health.toString(),
          inline: true,
        },
        {
          name: "Stamina",
          value: foodRecipes.stamina.toString(),
          inline: true,
        },
        {
          name: "Healing",
          value: foodRecipes.healing.toString(),
          inline: true,
        },
        {
          name: "Duration",
          value: foodRecipes.duration.toString(),
          inline: true,
        },
        {
          name: "Fork Type",
          value: foodRecipes.forkType,
          inline: true,
        },
        {
          name: "Biome",
          value: foodRecipes.biome,
          inline: true,
        },
        {
          name: "Crafting Station",
          value: foodRecipes.craftingStation,
          inline: true,
        }
      );

    const ingredientMap = foodRecipes.recipe;
    let ingredients = "";

    ingredientMap?.forEach((value, key) => {
      ingredients += `${key[0].toUpperCase()}${key.slice(1)}: x ${value}\n`;
    });

    recipeEmbed.addFields({
      name: "Recipe:",
      value: `${ingredients}`,
    });

    await interaction.editReply({ embeds: [recipeEmbed] });
  },
};
