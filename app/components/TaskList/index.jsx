import React from "react";
import TaskItem from "../TaskItem";

const TaskList = ({
  tasks,
  filter,
  handleDeleteTask,
  handleAddTask,
  handleToggleTask,
  handleFilterChange,
  handleClearCompleted,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  console.log(filteredTasks);

  return (
    <>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
            handleToggleTask={handleToggleTask}
          />
        ))}
      </ul>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <span>{filteredTasks.length} tasks left to complete</span>
        <div>
          <button
            onClick={() => handleFilterChange("all")}
            className={`mr-2 ${filter === "all" ? "text-white" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("active")}
            className={`mr-2 ${filter === "active" ? "text-white" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`${filter === "completed" ? "text-white" : ""}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => handleClearCompleted()}
          className="text-gray-400 hover:text-white"
        >
          Clear Completed
        </button>
      </div>
    </>
  );
};

export default TaskList;
