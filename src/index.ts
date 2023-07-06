import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";

(async () => {
  const Bot = new Client({ intents: IntentOptions });

  Bot.on("ready", () => console.log("Connected to Discord!"));

  await connectDatabase();
  await Bot.login(process.env.BOT_TOKEN);
})();
