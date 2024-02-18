import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';
import skylineImg from '../public/skyline.png';
import Clock from './Clock';

function HomePage() {
  const [priorityCounts, setPriorityCounts] = useState({
    highest: 0,
    high: 0,
    normal: 0,
    low: 0,
    lowest: 0
  });

  const [completedPriorityCounts, setCompletedPriorityCounts] = useState({
    highest: 0,
    high: 0,
    normal: 0,
    low: 0,
    lowest: 0
  });

  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPriorityCounts = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/todos`);
        if (response.ok) {
          const todos = await response.json();
          const priorityCounts = {
            highest: 0,
            high: 0,
            normal: 0,
            low: 0,
            lowest: 0
          };
          const completedPriorityCounts = {
            highest: 0,
            high: 0,
            normal: 0,
            low: 0,
            lowest: 0
          };

          todos.forEach(todo => {
            if (todo.status === 'completed') {
              completedPriorityCounts[todo.priority]++;
            } else {
              priorityCounts[todo.priority]++;
            }
          });

          setPriorityCounts(priorityCounts);
          setCompletedPriorityCounts(completedPriorityCounts);
        }
      } catch (error) {
        console.error('Error fetching priority counts:', error);
      }
    };

    fetchPriorityCounts();
  }, [serverUrl]);

  const getPriorityColor = priority => {
    switch (priority) {
      case 'lowest':
        return 'bg-green-400'; // Green for lowest priority
      case 'low':
        return 'bg-yellow-400'; // Yellow for low priority
      case 'normal':
        return 'bg-yellow-400'; // Yellow for normal priority
      case 'high':
        return 'bg-red-400'; // Red for high priority
      case 'highest':
        return 'bg-red-400'; // Red for highest priority
      default:
        return 'bg-gray-200'; // Default to gray
    }
  };

  return (
    <div className="bg-light-mint min-h-screen flex flex-col">
      {/* Top banner with skyline backdrop image */}
      <div 
        className="w-full flex justify-between p-4" 
        style={{ 
          backgroundImage: `url(${skylineImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center', 
          backgroundRepeat: 'no-repeat'
        }}
      >      
        <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
        <img src={cwuImg} alt="CWU School Logo" className="w-1/4"/>
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-center mt-4 p-4">
        <h1 className="text-3xl font-bold underline">
          Priority Todo Manager
        </h1>
        <b>Developed by team CWUsers for MLP Crimson Code Hackathon 2024</b>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Remaining TODO tasks:</h2>
          <ul>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('highest')}`}></div>
              Highest Priority ({priorityCounts.highest})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('high')}`}></div>
              High Priority ({priorityCounts.high})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('normal')}`}></div>
              Normal Priority ({priorityCounts.normal})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('low')}`}></div>
              Low Priority ({priorityCounts.low})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('lowest')}`}></div>
              Lowest Priority ({priorityCounts.lowest})
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Completed tasks:</h2>
          <ul>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('highest')}`}></div>
              Highest Priority ({completedPriorityCounts.highest})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('high')}`}></div>
              High Priority ({completedPriorityCounts.high})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('normal')}`}></div>
              Normal Priority ({completedPriorityCounts.normal})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('low')}`}></div>
              Low Priority ({completedPriorityCounts.low})
            </li>
            <li className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-2 ${getPriorityColor('lowest')}`}></div>
              Lowest Priority ({completedPriorityCounts.lowest})
            </li>
          </ul>
        </div>

        <Clock />
        <Link to="/todos" className="text-blue-500 hover:text-blue-800 mt-4">Go to Todo Page</Link>
        <Link to="/about" className="text-blue-500 hover:text-blue-800 mt-4">About Us</Link>
      </div>
    </div>
  );
}

export default HomePage;

