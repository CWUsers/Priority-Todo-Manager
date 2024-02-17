// src/pages/TodoPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';

const TodoPage = () => {
    return (
        <div className="bg-light-mint min-h-screen flex flex-col">
            <div className="bg-light-blue w-full flex justify-between p-4">
                <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/6"/>
                <img src={cwuImg} alt="CWU School Logo" className="w-1/2"/>
            </div>
            <h1 className="text-3xl font-bold underline">Todo Page</h1>
            {/* Todo list functionality will go here */}
            <Link to="/" className="text-blue-500 hover:text-blue-800">Go to Home Page</Link>
        </div>
    );
};

export default TodoPage;

