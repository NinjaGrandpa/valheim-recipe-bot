import { getAllFoodRecipes } from "../../modules/getAllFoodRecipes";
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("all")
    .setDescription("Shows all the available recipes."),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const foodRecipes = await getAllFoodRecipes();
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
