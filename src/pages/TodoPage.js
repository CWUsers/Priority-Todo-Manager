import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';
import Clock from './Clock';

const TodoPage = () => {
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);

    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/todos`);
            if (response.ok) {
                const fetchedTodos = await response.json();
                setTodos(fetchedTodos);
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
                body: JSON.stringify({ task: todoInput, priority: 'normal' }),
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
                <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2"
                />
                <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
            </div>
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold underline">Todo List</h1>
                <Clock />
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.task} (Priority:
                            <select
                                value={todo.priority}
                                onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                                className="ml-1"
                            >
                                <option value="lowest">Lowest</option>
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                                <option value="highest">Highest</option>
                            </select>)
                            <button onClick={() => handleRemoveTodo(todo.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-4">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <Link to="/" className="text-blue-500 hover:text-blue-800">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default TodoPage;

