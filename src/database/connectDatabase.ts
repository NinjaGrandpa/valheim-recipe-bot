import { connect } from "mongoose";

export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string, {dbName: "valheim-recipe-bot"});
  console.log("Database Connected!");
};