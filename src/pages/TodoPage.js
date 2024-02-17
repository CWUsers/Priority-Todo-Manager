// src/pages/TodoPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const TodoPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Todo Page</h1>
            {/* Todo list functionality will go here */}
            <Link to="/" className="text-blue-500 hover:text-blue-800">Go to Home Page</Link>
        </div>
    );
};

export default TodoPage;

