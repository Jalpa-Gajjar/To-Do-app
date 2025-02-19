import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (index, direction) => {
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(index, 1);
    newTasks.splice(index + direction, 0, movedTask);
    setTasks(newTasks);
  };

  const startEditing = (task) => {
    setEditing(task.id);
    setEditingText(task.text);
  };

  const saveEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditing(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button className="btn btn-success" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editing === task.id ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button
                  className="btn btn-primary me-2"
                  onClick={() => saveEditing(task.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="fw-bold">{task.text}</span>
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => startEditing(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  {index > 0 && (
                    <button
                      className="btn btn-info me-2"
                      onClick={() => moveTask(index, -1)}
                    >
                      Up
                    </button>
                  )}
                  {index < tasks.length - 1 && (
                    <button
                      className="btn btn-info"
                      onClick={() => moveTask(index, 1)}
                    >
                      Down
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;