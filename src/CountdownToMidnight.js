import React, { useState, useEffect } from 'react';

function CountdownToMidnight() {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const currentDateTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      const midnight = new Date(currentDateTime);
      midnight.setHours(24, 0, 0, 0);

      const timeDiff = midnight - currentDateTime;

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    calculateTimeRemaining();

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3>New Game in: {timeRemaining}</h3>
    </div>
  );
}

export default CountdownToMidnight;
