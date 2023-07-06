import { Document, model, Schema } from "mongoose";
import { ICamper } from "../../interfaces/ICamper";

export const Camper = new Schema({
  discordId: String,
  round: Number,
  day: Number,
  timestamp: Number,
});

export default model<ICamper>("camper", Camper);
