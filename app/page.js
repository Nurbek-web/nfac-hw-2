"use client";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    console.log(storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleAddTask = (event) => {
    event.preventDefault();
    const taskText = event.target.taskText.value;
    if (taskText.trim() === "") return;

    const newTask = {
      id: Math.random(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    event.target.reset();
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <form onSubmit={handleAddTask} className="mb-4 flex items-center">
        <input
          type="text"
          name="taskText"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </form>

      <div className="bg-gray-800 rounded p-4">
        <TaskList
          tasks={tasks}
          filter={filter}
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
          handleToggleTask={handleToggleTask}
          handleFilterChange={handleFilterChange}
          handleClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  );
}
