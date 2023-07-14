import { Document, Schema, model } from "mongoose";

export interface FoodInterface extends Document {
  name: string;
  health: number;
  stamina: number;
  healing: number;
  duration: number;
  forkType: string;
  biome: string;
  craftingStation: string;
  recipe?: Map<string, string>;
}

export const Food = new Schema({
  name: String,
  health: Number,
  stamina: Number,
  healing: Number,
  duration: Number,
  forkType: String,
  biome: String,
  craftingStation: { type: String, default: "None" },
  recipe: { type: Map, of: String, default: {None: " "} },
});

export default model<FoodInterface>("food", Food);
