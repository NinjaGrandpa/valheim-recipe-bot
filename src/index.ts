import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";

(async () => {
  if (!validateEnv()) return;

  const Bot = new Client({ intents: IntentOptions });

  Bot.on("ready", async () => onReady(Bot));
  Bot.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

  await connectDatabase();

  await Bot.login(process.env.BOT_TOKEN);
})();
