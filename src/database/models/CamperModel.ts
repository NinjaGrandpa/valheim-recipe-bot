import { Document, model, Schema } from "mongoose";

export interface ICamper extends Document{
    discordId: string;
    round: number;
    day: number;
    timestamp: number;
}

export const Camper = new Schema({
  discordId: String,
  round: Number,
  day: Number,
  timestamp: Number,
});

export default model<ICamper>("camper", Camper);
