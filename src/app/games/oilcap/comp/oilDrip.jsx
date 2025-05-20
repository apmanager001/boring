import React from "react";

const OilDrop = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 100 100">
      <path
        d="M50 20 C 40 40, 60 60, 50 80"
        fill="black"
        stroke="black"
        strokeWidth="2"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="0 20"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default OilDrop;
