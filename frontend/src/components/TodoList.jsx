import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
    if (!todos.length) return <p className="mt-4 text-slate-400 text-center">No todos yet — add one above.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}

export default TodoList;