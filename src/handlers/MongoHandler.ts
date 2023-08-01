import { connect } from "mongoose";
import { populateDatabase } from "../database/populateDatabase";
import foodData from "../database/data/foods.json";
import FoodModel from "../models/FoodModel";

export const MongoHandler = async () => {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_URI as string, {
    dbName: "valheim-recipe-bot",
  });
  console.log("Database Connected!");

  console.log("Comparing data...");

  if (foodData.length !== (await FoodModel.find()).length) {
    await populateDatabase();
  } else {
    console.log("Data compared.");
  }
};
