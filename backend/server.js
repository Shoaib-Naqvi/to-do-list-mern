import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/To-do_List_db";

connectDB(MONGO_URI);

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send("MERN Todo API is running"));

if (process.env.NODE_ENV !== "production" && !process.env.NETLIFY) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
