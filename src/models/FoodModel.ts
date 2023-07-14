import { Document, Schema, model } from "mongoose";

export interface FoodInterface extends Document {
  name: string;
  health: number;
  stamina: number;
  healing: number;
  duration: number;
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
  biome: String,
  craftingStation: { type: String, default: "None" },
  recipe: { type: Map, of: String },
});

export default model<FoodInterface>("food", Food);
