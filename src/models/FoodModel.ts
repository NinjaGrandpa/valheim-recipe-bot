import { Document, Schema, model } from "mongoose";

export interface FoodInterface extends Document {
  name: string;
  health: number;
  stamina: number;
  healing: number;
  duration: number;
  biome: string;
  craftingStation: string;
  recipe: Map<string, number>;
}

export const Food = new Schema({
  name: String,
  health: Number,
  stamina: Number,
  healing: Number,
  duartion: Number,
  biome: String,
  craftingStation: String,
  recipe: { type: Map, of: String },
});

export default model<FoodInterface>("food", Food);
