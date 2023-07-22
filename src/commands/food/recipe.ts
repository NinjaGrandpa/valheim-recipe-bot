import { SlashCommandBuilder } from "@discordjs/builders";
import { getFoodRecipe } from "../../modules/getFoodRecipe";
import {
  AttachmentBuilder,
  AutocompleteInteraction,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { getAllFoodRecipes } from "../../modules/getAllFoodRecipes";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recipe")
    .setDescription("Shows information on the searched recipe.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Input the name of a food item")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = await getAllFoodRecipes();
    const filtered = choices.filter((choice) =>
      choice.name.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice.name, value: choice.name }))
    );
  },
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const nameInput = interaction.options.get("name", true);

    const foodRecipes = await getFoodRecipe(nameInput.value as string);

    if (!foodRecipes) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Food Recipe Error")
        .setDescription(`Can't find food recipe: ${nameInput.value}.`);
      await interaction.editReply({ embeds: [errorEmbed] });
    } else {
      const imageName = foodRecipes.name.replace(/ /g, "_");

      const attachment = new AttachmentBuilder(`./src/images/${imageName}.png`);

      const recipeEmbed = new EmbedBuilder()
        .setTitle("Food Recipe")
        .setDescription(`Showing Recipe for ${foodRecipes.name}`)
        .setThumbnail(`attachment://${imageName}.png`)
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

      await interaction.editReply({
        embeds: [recipeEmbed],
        files: [attachment],
      });
    }
  },
};
