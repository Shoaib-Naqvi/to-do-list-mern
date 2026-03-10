import { fetchAllTodos, saveTodo, updateTodoById, deleteTodoById } from "../config/storage.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await fetchAllTodos();
    res.json(todos);
  } catch (err) {
    console.error("Error in getTodos:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description, startDate, deadline } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    
    const todo = await saveTodo({
      title: title.trim(),
      description: description ? description.trim() : "",
      startDate,
      deadline,
    });
    
    res.status(201).json(todo);
  } catch (err) {
    console.error("Error in createTodo:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const todo = await updateTodoById(id, updates);
    
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error("Error in updateTodo:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteTodoById(id);
    
    if (!success) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Error in deleteTodo:", err);
    res.status(500).json({ message: "Server Error" });
  }
};