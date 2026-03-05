import express from "express";
const router = express.Router();
import * as controller from "../controllers/todoController.js";

router.get("/", controller.getTodos);
router.post("/", controller.createTodo);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

export default router;