import { Command } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { getAllFoodRecipes } from "../modules/getAllFoodRecipes";
import { EmbedFieldData, MessageEmbed } from "discord.js";

export const all: Command = {
  data: new SlashCommandBuilder()
    .setName("all")
    .setDescription("Shows all the available food recipes."),

  run: async (interaction) => {
    await interaction.deferReply();
    const foodRecipes = await getAllFoodRecipes();

    const recipeEmbed = new MessageEmbed()
      .setTitle("Food Recipes")
      .setDescription(
        `Showing all available food recipes. Current amount of recipies ${foodRecipes.length}`
      )
      .addFields(
        {
          name: "Name",
          value: foodRecipes[0].name,
          inline: true,
        },
        {
          name: "Health",
          value: foodRecipes[0].health.toString(),
          inline: true,
        },
        {
          name: "Stamina",
          value: foodRecipes[0].stamina.toString(),
          inline: true,
        },
        {
          name: "Healing",
          value: foodRecipes[0].healing.toString(),
          inline: true,
        },
        {
          name: "Duration",
          value: foodRecipes[0].duration.toString(),
          inline: true,
        },
        {
          name: "Biome",
          value: foodRecipes[0].biome,
          inline: true,
        },
        {
          name: "Crafting Station",
          value: foodRecipes[0].craftingStation,
          inline: true,
        }
      );

    await interaction.editReply({ embeds: [recipeEmbed] });
  },
};
