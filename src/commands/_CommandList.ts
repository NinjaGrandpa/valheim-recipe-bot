import { Command } from "../interfaces/Command";
import { edit } from "./edit";
import { oneHundred } from "./oneHundred";
import { view } from "./view";

export const CommandList: Command[] = [edit, oneHundred, view];
