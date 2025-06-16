import React, { useState, useEffect } from "react";

const Timer = ({ running, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30); // Start at 30 seconds

  useEffect(() => {
    if (running && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    }
    if (timeLeft === 0 && running) {
      onTimeUp();
    } 
  }, [running, timeLeft]);
  // useEffect(() => {
  //   if (!running) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         onTimeUp();
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [running, onTimeUp]);

  return <div className="font-bold text-lg">Time Left: {timeLeft} s</div>;
};

export default Timer;
