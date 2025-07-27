import React from "react";

const LoadingSpinner = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        className={`loading loading-dots ${sizeClasses[size]} text-accent`}
      ></span>
    </div>
  );
};

export default LoadingSpinner;
