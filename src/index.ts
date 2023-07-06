import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";

(async () => {
  const Bot = new Client({ intents: IntentOptions });

  await Bot.login(process.env.BOT_TOKEN);
})();
