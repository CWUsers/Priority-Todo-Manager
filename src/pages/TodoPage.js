import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';

const TodoPage = () => {
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);

    // Define serverUrl here for use in API calls
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
        try {
            const response = await fetch(`${serverUrl}/api/todos/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: todoInput }), // Changed from { todo: todoInput }
            });
            if (response.ok) {
                setTodoInput(''); // Clear the input field
                fetchTodos(); // Refresh the todos list
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleRemoveTodo = async (id) => { // Assuming you can pass the ID as an argument
        try {
            const response = await fetch(`${serverUrl}/api/todos/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Now sending the ID for deletion
            });
            if (response.ok) {
                fetchTodos(); // Refresh the todos list
            }
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    // Use useEffect to fetch todos when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="bg-light-mint min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-light-blue w-full flex justify-between p-4">
                <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
                <img src={cwuImg} alt="CWU School Logo" className="w-1/4"/>
            </div>

            {/* Todo input */}
            <div className="p-4">
                <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2"
                />
                <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
            </div>
            
            {/* Todo list */}
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold underline">Todo List</h1>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.task} {todo.id}
                            <button onClick={() => handleRemoveTodo(todo.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-4">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Navigation Link */}
            <div className="mt-4">
                <Link to="/" className="text-blue-500 hover:text-blue-800">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default TodoPage;

