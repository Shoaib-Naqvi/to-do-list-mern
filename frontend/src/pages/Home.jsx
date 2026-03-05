import { useEffect, useState } from "react";
import API from "../api";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (taskData) => {
    try {
      const res = await API.post("/todos", taskData);
      setTodos((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const res = await API.put(`/todos/${id}`, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex-grow space-y-8 flex flex-col">
        <header className="text-center space-y-4 animate-slide-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 tracking-tight">
            Task Master
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">
            Manage your tasks with focus and clarity.
          </p>
        </header>

        <main className="space-y-8 flex-grow">
          <div className="max-w-2xl mx-auto animate-slide-in stagger-1">
            <AddTodoForm onAdd={addTodo} />
          </div>
          <div className="animate-slide-in stagger-2">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-20 glass-panel max-w-lg mx-auto">
                <p className="text-slate-400 text-xl">
                  No tasks yet. Start by adding one!
                </p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={updateTodo}
                onDelete={deleteTodo}
                onEdit={updateTodo}
              />
            )}
          </div>
        </main>

        <footer className="text-center text-slate-300 text-sm mt-auto pt-12 animate-slide-in stagger-3">
          <p>© {new Date().getFullYear()} Build By Shoaib Raza</p>
        </footer>
      </div>
    </div>
  );
}
