import React, { useState, useEffect } from "react";

const Timer = ({ running }) => {
  const [timeLeft, setTimeLeft] = useState(30); // Start at 30 seconds

  useEffect(() => {
    if (running && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [running, timeLeft]);

  return <div className="font-bold text-lg">Time Left: {timeLeft}s</div>;
};

export default Timer;
