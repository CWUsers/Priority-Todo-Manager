import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toDateString();

  return (
    <div className="clock-container">
      {formattedTime.split(':').map((segment, index) => (
        <div key={index}>
          {segment.split('').map((digit, index) => (
            <span key={index} className="led">{digit}</span>
          ))}
          {index === 0 && <span className="colon">:</span>}
        </div>
      ))}
      <br />
      <span>{formattedDate}</span>
    </div>
  );
};

export default Clock;

