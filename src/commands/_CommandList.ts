import { Command } from "../interfaces/Command";
import { all } from "./all";
import { recipe } from "./recipe";

export const CommandList: Command[] = [all, recipe];
