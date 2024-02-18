import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';
import skylineImg from '../public/skyline.png';
import Clock from './Clock';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HomePage() {
  const [todos, setTodos] = useState([]);

  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

  useEffect(() => {
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

    fetchTodos();
  }, []);

  // Priority counts for tasks and completed tasks
  const priorityMap = ['lowest', 'low', 'normal', 'high', 'highest'];
  const priorityCounts = { lowest: 0, low: 0, normal: 0, high: 0, highest: 0 };
  const completedPriorityCounts = { ...priorityCounts };

  todos.forEach(todo => {
    if (todo.status === 'completed') {
      completedPriorityCounts[todo.priority]++;
    } else {
      priorityCounts[todo.priority]++;
    }
  });

  // Chart data
  const chartData = {
    labels: priorityMap,
    datasets: [
      {
        label: 'Remainig Tasks',
        data: priorityMap.map(priority => priorityCounts[priority]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Completed Tasks',
        data: priorityMap.map(priority => completedPriorityCounts[priority]),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const getPriorityColor = priority => ({
    lowest: 'bg-green-400',
    low: 'bg-yellow-400',
    normal: 'bg-yellow-500',
    high: 'bg-red-400',
    highest: 'bg-red-500',
  })[priority];

  return (
    <div className="bg-light-mint min-h-screen flex flex-col">
      <div
        className="w-full flex justify-between items-center p-4"
        style={{
          backgroundImage: `url(${skylineImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex items-center">
          <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12" />
          <h1 className="text-5xl text-white font-bold pl-4">
            Priority Todo Manager
          </h1>
        </div>

        <div className="flex-grow"></div>

        <img src={cwuImg} alt="CWU School Logo" className="w-1/4" />
      </div>

      <div className="flex flex-col items-center mt-4 p-4">
        <h1 className="text-5xl font-bold">Todo Manager Overview</h1>

        {/* Three-column layout: Task list, Graph, Completed Task list */}
        <div className="flex w-full justify-around mt-4">
          <div className="w-1/4">
            <h2 className="text-xl font-bold mb-2">Remaining Tasks by Priority</h2>
            {priorityMap.map(priority => (
              <p key={priority} className={`${getPriorityColor(priority)} rounded p-2`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}: {priorityCounts[priority]}
              </p>
            ))}
          </div>

          <div className="w-1/3">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="w-1/4">
            <h2 className="text-xl font-bold mb-2">Completed Tasks by Priority</h2>
            {priorityMap.map(priority => (
              <p key={priority + 'c'} className={`${getPriorityColor(priority)} rounded p-2`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}: {completedPriorityCounts[priority]}
              </p>
            ))}
          </div>
        </div>

        <Clock />
        <div className="flex justify-center mt-4 space-x-4">
          <Link to="/todos" className="text-blue-500 hover:text-blue-800">Todo Page</Link>
          <Link to="/about" className="text-blue-500 hover:text-blue-800">About Us</Link>
        </div>
        <b>Developed by team CWUsers for MLP Crimson Code Hackathon 2024</b>
      </div>
    </div>
  );
}

export default HomePage;

