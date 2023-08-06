import { Client } from "discord.js";
import { join } from "node:path";
import { readdirSync } from "node:fs";

export const SlashCommandHandler = (client: Client) => {
  const foldersPath = join(__dirname, "../commands");
  const commandFolders = readdirSync(foldersPath);

  console.log(commandFolders);

  commandFolders.forEach((folder) => {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".js")
    );

    commandFiles.forEach((file) => {
      const filePath = join(commandsPath, file);
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    });
  });
};
