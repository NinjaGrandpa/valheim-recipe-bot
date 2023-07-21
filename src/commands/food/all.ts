import { getAllFoodRecipes } from "../../modules/getAllFoodRecipes";
import {
  AutocompleteInteraction,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { getAllIngredients } from "../../modules/getAllIngredients";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("all")
    .setDescription("Shows all the available recipes.")
    .addStringOption((option) =>
      option
        .setName("ingredient")
        .setDescription("Finds all recipes containing the ingredient.")
        .setAutocomplete(true)
    ),
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = await getAllIngredients();
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const ingredientInput = interaction.options.get("ingredient");

    const foodRecipes = await getAllFoodRecipes(
      ingredientInput?.value as string
    );

    const recipeEmbed = new EmbedBuilder()
      .setTitle("All Food Recipes")
      .setDescription(`Showing all ${foodRecipes.length} food recipes`);

    let foodNames = "";

    foodRecipes.forEach((food) => {
      foodNames += `${food.name}\n`;
    });

    recipeEmbed.addFields({
      name: "Food Recipes",
      value: foodNames,
    });

    await interaction.editReply({ embeds: [recipeEmbed] });
  },
};
