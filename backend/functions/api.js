import serverless from "serverless-http";
import app from "../server.js";
import dotenv from "dotenv";

dotenv.config();

export const handler = serverless(app);
