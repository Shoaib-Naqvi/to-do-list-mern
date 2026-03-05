import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNewTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAdd({
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      startDate,
      deadline,
    });

    setTaskTitle("");
    setTaskDesc("");
    setStartDate("");
    setDeadline("");
    setIsExpanded(false);
  };

  return (
    <div className="glass-panel p-6 transition-all duration-300">
      <form onSubmit={handleNewTask} className="space-y-4">
        {/* Main Input */}
        <div className="relative">
          <input
            className="input-field text-lg font-medium bg-slate-800/50 focus:bg-slate-800/80"
            placeholder="What do you need to get done?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
          />
        </div>

        {(isExpanded || taskTitle) && (
          <div className="animate-slide-in space-y-4 pt-2">
            <textarea
              className="input-field text-sm min-h-[80px] resize-none"
              placeholder="Add some details about this task..."
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />

            {/* Dates Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="input-field text-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Deadline</label>
                <input
                  type="date"
                  className="input-field text-sm"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn btn-secondary text-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-6">
                Create Task
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
