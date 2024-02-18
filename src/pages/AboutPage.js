import React from 'react';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';
import teamImg from '../public/team.png'; 
import skylineImg from '../public/skyline.png';
import { Link } from 'react-router-dom';
import Clock from './Clock';

const AboutPage = () => {

  return (
    <div className="bg-light-mint min-h-screen flex flex-col">
      <div 
        className="w-full flex justify-between items-center p-4" 
        style={{ 
          backgroundImage: `url(${skylineImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center', 
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Left side with Crimson Code logo and title */}
        <div className="flex items-center">
          <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
          <h1 className="text-5xl text-white font-bold pl-4">
            Priority Todo Manager
          </h1>
        </div>

        <div className="flex-grow"></div>

        <img src={cwuImg} alt="CWU School Logo" className="w-1/4"/>
      </div>
      <div className="flex flex-col items-center mt-4 p-4">
        <h1 className="text-3xl font-bold underline">About Us</h1>
        <p><br/>Welcome to the Priority Todo Manager application About Us page.</p>
        <p>Project was developed by Central Washington University's Team #2 'CWUsers'.</p>
        <p>Built for the MLP Crimson Code Hackathon February 16-17 2024.</p>
        
        <p><br/>Programmed by: Alice Williams, Jake Robinson, and Connor Dunning over the span of 24 hours.</p>
        <p>Technology stack: Redis, React, React-router, Node.js, Express.js, Tailwind-css.</p>
        <img src={teamImg} alt="Our Team" className="mt-4 max-w-full h-auto w-1/3" />
        <Clock />
        <div className="flex justify-center mt-4 space-x-4">
            <Link to="/" className="text-blue-500 hover:text-blue-800">Home Page</Link>
            <Link to="/about" className="text-blue-500 hover:text-blue-800">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

