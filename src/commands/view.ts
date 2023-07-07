import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { getCamperData } from "../modules/getCamperData";

export const view: Command = {
  data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("Shows your latest 100 days of code check in."),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const targetCamper = await getCamperData(user.id);

    if (!targetCamper.day) {
      await interaction.editReply({
        content:
          "It looks like you have not started the 100 Days of Code challenge yet. User `/100` and add your message to report your first day!",
      });
      return;
    }

    const camperEmbed = new MessageEmbed()
      .setTitle("My 100 Days of Code Progress")
      .setDescription(
        `Here is my 100 Days of Code progress. I last reported an update on ${new Date(
          targetCamper.timestamp
        ).toLocaleDateString()}.`
      )
      .addFields(
        {
          name: "Round",
          value: targetCamper.round.toString(),
          inline: true,
        },
        {
          name: "Day",
          value: targetCamper.day.toString(),
          inline: true,
        }
      )
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL(),
      });

      await interaction.editReply({ embeds: [camperEmbed] });
  },
};
