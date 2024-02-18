import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';
import Clock from './Clock';

const TodoPage = () => {
    const [todoInput, setTodoInput] = useState('');
    const [priority, setPriority] = useState('normal');
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]); // State for completed tasks
    const [completedCount, setCompletedCount] = useState(0); // State to store completed tasks count

    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/todos`);
            if (response.ok) {
                const fetchedTodos = await response.json();
                setTodos(fetchedTodos.filter(todo => todo.status !== 'completed')); // Filter out completed tasks
                setCompletedTodos(fetchedTodos.filter(todo => todo.status === 'completed')); // Set completed tasks
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        // Check if the input field is empty
        if (!todoInput.trim()) {
            alert('Please enter a task before adding.');
            return;
        }
        try {
            const response = await fetch(`${serverUrl}/api/todos/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: todoInput, priority }),
            });
            if (response.ok) {
                setTodoInput('');
                fetchTodos();
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleRemoveTodo = async (id) => {
        try {
            const response = await fetch(`${serverUrl}/api/todos/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    const handleCompleteTodo = async (id) => {
        try {
            const response = await fetch(`${serverUrl}/api/todos/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                // Increment completed count
                setCompletedCount(prevCount => prevCount + 1);
                fetchTodos();
            }
        } catch (error) {
            console.error('Error completing todo:', error);
        }
    };

    const handlePriorityChange = async (id, priority) => {
        try {
            const response = await fetch(`${serverUrl}/api/todos/updatePriority`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, priority }),
            });
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error updating priority:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="bg-light-mint min-h-screen flex flex-col">
            <div className="bg-light-blue w-full flex justify-between p-4">
                <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
                <img src={cwuImg} alt="CWU School Logo" className="w-1/4"/>
            </div>
            <div className="p-4">
                <div className="flex justify-center">
                    <div className="flex items-center mr-4">
                        <label htmlFor="taskInput" className="mr-2">Task Name:</label>
                        <input
                            type="text"
                            id="taskInput"
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        />
                    </div>
                    <div className="flex items-center mr-4">
                        <label htmlFor="prioritySelect" className="mr-2">Priority:</label>
                        <select
                            id="prioritySelect"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        >
                            <option value="lowest">Lowest</option>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="highest">Highest</option>
                        </select>
                    </div>
                    <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
                </div>
            </div>
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold underline">Todo List</h1>
                <Clock />
                <ul>
                  {todos.map((todo, index) => (
                    <li key={todo.id} className="w-full flex justify-between items-center mb-2"> {/* Ensure flex and consistent spacing between items */}
                      <span className="flex-1 truncate">{index}: {todo.task}</span> {/* Truncate long text */}
                      <span>(Priority:
                        <select
                          value={todo.priority}
                          onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                          className="mx-2"
                        >
                          <option value="lowest">Lowest</option>
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="highest">Highest</option>
                        </select>)
                      </span>
                      <button onClick={() => handleRemoveTodo(todo.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-4">Remove</button>
                      <button onClick={() => handleCompleteTodo(todo.id)} className="bg-green-500 text-white px-4 py-2 rounded ml-4">Complete</button>
                    </li>
                  ))}
                </ul>
            </div>
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold underline">Completed Tasks</h1>
                <ul>
                    {completedTodos.map((todo, index) => (
                        <li key={todo.id} className="w-full"> {/* Added container with consistent width */}
                            {index}: {todo.task} (Priority: {todo.priority})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:text-blue-800">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default TodoPage;

