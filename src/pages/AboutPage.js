import React from 'react';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';
import teamImg from '../public/team.png'; 
import { Link } from 'react-router-dom';
import Clock from './Clock';

const AboutPage = () => {
  return (
    <div className="bg-light-mint min-h-screen flex flex-col">
      <div className="bg-light-blue w-full flex justify-between p-4">      
        <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
        <img src={cwuImg} alt="CWU School Logo" className="w-1/4"/>
      </div>
      <div className="flex flex-col items-center mt-4 p-4">
        <h1 className="text-3xl font-bold underline">About Us</h1>
        <p>This project was developed by CWUsers for the MLP Crimson Code Hackathon 2024.</p>
        <img src={teamImg} alt="Our Team" className="mt-4 max-w-full h-auto w-1/2" />
        <Clock />
        <Link to="/" className="text-blue-500 hover:text-blue-800 mt-4">Go back to Home Page</Link>
      </div>
    </div>
  );
};

export default AboutPage;

