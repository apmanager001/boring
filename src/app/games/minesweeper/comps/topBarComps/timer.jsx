'use client'
import React, { useState, useRef, useEffect } from "react";

const Timer = ({start}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (start) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [start]);

  // const startTimer = () => {
  //   if (!isRunning) {
  //     setIsRunning(true);
  //     intervalRef.current = setInterval(() => {
  //       setTime((prevTime) => prevTime + 1);
  //     }, 1000);
  //   }
  // };

  // const stopTimer = () => {
  //   if (isRunning) {
  //     clearInterval(intervalRef.current);
  //     setIsRunning(false);
  //   }
  // };

  // const resetTimer = () => {
  //   clearInterval(intervalRef.current);
  //   setTime(0);
  //   setIsRunning(false);
  // };

  return (
    <div className="text-center">
      <h1 className="font-extrabold">{time} seconds</h1>
      {/* <button className="btn btn-primary btn-sm" onClick={startTimer}>Start</button> */}
      {/* <button onClick={stopTimer}>Stop</button> */}
      {/* <button onClick={resetTimer}>Reset</button> */}
    </div>
  );
};

export default Timer;
