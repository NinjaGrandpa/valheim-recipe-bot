import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./events/onInteraction";

(async () => {
  if (!validateEnv()) return;

  const Bot = new Client({ intents: IntentOptions });

  Bot.on("ready", () => console.log("Connected to Discord!"));
  Bot.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

  await connectDatabase();

  await Bot.login(process.env.BOT_TOKEN);
})();
