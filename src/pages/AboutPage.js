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
      <div className="flex flex-col items-center mt-4 p-4">
        <h1 className="text-3xl font-bold underline">About Us</h1>
        <p>This project was developed by Central Washington University's Team #2 CWUsers for the MLP Crimson Code Hackathon 2024.</p>
        <p>Programmed by: Alice Williams, Jake Robinson, and Connor Dunning over the span of 24 hours.</p>
        <p>Technology stack: Redis, React, React-router, Node.js, Express.js, Tailwind-css.</p>
        <img src={teamImg} alt="Our Team" className="mt-4 max-w-full h-auto w-1/3" />
        <Clock />
        <Link to="/" className="text-blue-500 hover:text-blue-800 mt-4">Go back to Home Page</Link>
      </div>
    </div>
  );
};

export default AboutPage;

