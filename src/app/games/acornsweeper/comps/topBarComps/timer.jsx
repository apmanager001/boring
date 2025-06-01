"use client";
import React, { useState, useRef, useEffect } from "react";

const Timer = ({ start, onTimeUpdate }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(time);
    }
  }, [time, onTimeUpdate]);

  useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
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

  return (
    <div className="text-center">
      <h1 className="font-extrabold">{time} seconds</h1>
    </div>
  );
};

export default Timer;
