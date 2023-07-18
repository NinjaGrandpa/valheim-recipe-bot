import { REST } from "@discordjs/rest";
import { Client, Events, Routes } from "discord.js";

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute (client: Client) {
    console.log("Connecting to discord...");

    const rest = new REST({ version: "10" }).setToken(
      process.env.BOT_TOKEN as string
    );

    try {
      console.log(
        `Started refreshing ${client.commands.size} application (/) commands.`
      );

        const commandData = client.commands.map((command) => command.data.toJSON());

      const data = await rest.put(
        Routes.applicationGuildCommands(
          client.user?.id || "missing id",
          process.env.GUILD_ID as string
        ),
        { body: commandData}
      );

      console.log(
        `Successfully reloaded ${client.commands.size} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  },
};
