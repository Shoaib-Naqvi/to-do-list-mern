import serverless from "serverless-http";
import app from "../server.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/To-do_List_db";

const handlerFunc = serverless(app);

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectDB(MONGO_URI);

  return await handlerFunc(event, context);
};
