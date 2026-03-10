import { getStore } from "@netlify/blobs";
import crypto from "crypto";

//local development, we store data in memory.
//local dev environment, you might use JSON file
let localStore = [];

const getTodoStore = () => {
  return getStore("todos");
};

export const fetchAllTodos = async () => {
  if (process.env.NETLIFY) {
    const store = getTodoStore();
    const result = await store.get("all-todos", { type: "json" });
    return result || [];
  }
  return [...localStore].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const saveTodo = async (todoData) => {
  const newTodo = {
    ...todoData,
    _id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    completed: false
  };

  if (process.env.NETLIFY) {
    const store = getTodoStore();
    const todos = await fetchAllTodos();
    const updatedTodos = [newTodo, ...todos];
    await store.setJSON("all-todos", updatedTodos);
    return newTodo;
  }

  localStore.unshift(newTodo);
  return newTodo;
};

export const updateTodoById = async (id, updates) => {
  if (process.env.NETLIFY) {
    const store = getTodoStore();
    const todos = await fetchAllTodos();
    const index = todos.findIndex(t => t._id === id);
    if (index === -1) return null;
    
    todos[index] = { ...todos[index], ...updates };
    await store.setJSON("all-todos", todos);
    return todos[index];
  }

  const index = localStore.findIndex(t => t._id === id);
  if (index === -1) return null;
  
  localStore[index] = { ...localStore[index], ...updates };
  return localStore[index];
};

export const deleteTodoById = async (id) => {
  if (process.env.NETLIFY) {
    const store = getTodoStore();
    const todos = await fetchAllTodos();
    const filtered = todos.filter(t => t._id !== id);
    await store.setJSON("all-todos", filtered);
    return true;
  }

  localStore = localStore.filter(t => t._id !== id);
  return true;
};
