import { Client, Collection, GatewayIntentBits } from "discord.js";
import { MongoHandler } from "./handlers/MongoHandler";
import { SlashCommandHandler } from "./handlers/SlashCommandHandler";
import { EventHandler } from "./handlers/EventHandler";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

SlashCommandHandler(client);
EventHandler(client);
MongoHandler();

client.login(process.env.BOT_TOKEN);
