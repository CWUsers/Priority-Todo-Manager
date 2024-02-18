import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import crimsonImg from "../public/crimson.png";
import cwuImg from "../public/cwu.png";
import skylineImg from "../public/skyline.png";
import Clock from "./Clock";

const TodoPage = () => {
  const [todoInput, setTodoInput] = useState("");
  const [priority, setPriority] = useState("normal");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]); // State for completed tasks
  const [completedCount, setCompletedCount] = useState(0); // State to store completed tasks count

  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/todos`);
      if (response.ok) {
        const fetchedTodos = await response.json();
        setTodos(fetchedTodos.filter((todo) => todo.status !== "completed")); // Filter out completed tasks
        setCompletedTodos(
          fetchedTodos.filter((todo) => todo.status === "completed"),
        ); // Set completed tasks
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    // Check if the input field is empty
    if (!todoInput.trim()) {
      alert("Please enter a task before adding.");
      return;
    }
    try {
      const response = await fetch(`${serverUrl}/api/todos/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: todoInput, priority }),
      });
      if (response.ok) {
        setTodoInput("");
        fetchTodos();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/api/todos/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/api/todos/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        // Increment completed count
        setCompletedCount((prevCount) => prevCount + 1);
        fetchTodos();
      }
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      const response = await fetch(`${serverUrl}/api/todos/updatePriority`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, priority }),
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="bg-light-mint flex min-h-screen flex-col">
      {/* Top banner with skyline backdrop image */}
      <div
        className="flex w-full justify-between p-4"
        style={{
          backgroundImage: `url(${skylineImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center">
          <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
          <h1 className="text-5xl text-white font-bold pl-4">
            Priority Todo Manager
          </h1>
        </div>
        <img src={cwuImg} alt="CWU School Logo" className="w-1/4" />
      </div>
      <div className="p-4">
        <div className="flex justify-center">
          <div className="mr-4 flex items-center">
            <label htmlFor="taskInput" className="mr-2">
              Task Name:
            </label>
            <input
              type="text"
              id="taskInput"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="rounded border border-gray-300 p-2"
            />
          </div>
          <div className="mr-4 flex items-center">
            <label htmlFor="prioritySelect" className="mr-2">
              Priority:
            </label>
            <select
              id="prioritySelect"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded border border-gray-300 p-2"
            >
              <option value="lowest">Lowest</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="highest">Highest</option>
            </select>
          </div>
          <button
            onClick={handleAddTodo}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add Todo
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">Todo List</h1>
        <Clock />
        <ul>
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="mb-2 flex w-full items-center justify-between"
            >
              {" "}
              {/* Ensure flex and consistent spacing between items */}
              <span className="flex-1 truncate">
                {index}: {todo.task}
              </span>{" "}
              {/* Truncate long text */}
              <span>
                (Priority:
                <select
                  value={todo.priority}
                  onChange={(e) =>
                    handlePriorityChange(todo.id, e.target.value)
                  }
                  className="mx-2"
                >
                  <option value="lowest">Lowest</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="highest">Highest</option>
                </select>
                )
              </span>
              <span>
                {" "}
                Created At:{" "}
                {(() => {
                  const createdAtDate = new Date(todo.created_time);
                  const timeString = createdAtDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  const dateString = createdAtDate.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  });
                  const timeZoneName = createdAtDate
                    .toLocaleTimeString("en-US", { timeZoneName: "short" })
                    .split(" ")[2];
                  return `${timeString} ${timeZoneName} | ${dateString}`;
                })()}
              </span>{" "}
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className="ml-4 rounded bg-red-500 px-4 py-2 text-white"
              >
                Remove
              </button>
              <button
                onClick={() => handleCompleteTodo(todo.id)}
                className="ml-4 rounded bg-green-500 px-4 py-2 text-white"
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">Completed Tasks</h1>
        <ul>
          {completedTodos.map((todo, index) => (
            <li key={todo.id} className="w-full">
              {" "}
              {/* Added container with consistent width */}
              {index}: {todo.task} (Priority: {todo.priority}) | Completed At:{" "}
              {(() => {
                const createdAtDate = new Date(todo.end_time);
                const timeString = createdAtDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                const dateString = createdAtDate.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                });
                const timeZoneName = createdAtDate
                  .toLocaleTimeString("en-US", { timeZoneName: "short" })
                  .split(" ")[2];
                return `${timeString} ${timeZoneName} | ${dateString}`;
              })()}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
             <Link to="/" className="text-blue-500 hover:text-blue-800">Home Page</Link>
             <Link to="/about" className="text-blue-500 hover:text-blue-800">About Us</Link>
        </div>
        <b>Developed by team CWUsers for MLP Crimson Code Hackathon 2024</b>
    </div>
  );
};

export default TodoPage;

