import { Client } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";

export const EventHandler = (client: Client) => {
  const eventsPath = join(__dirname, "../events");
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.endsWith(".js")
  );

  eventFiles.forEach((file) => {
    const filePath = join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
};