import React, {useState} from 'react'

const RightToUp = ({ width = "100%", height = "100%", isOilFlowing }) => {
  // const [isOilFlowing, setIsOilFlowing] = useState(false);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- Vertical Pipe: Centered --> */}
      <rect
        x="80"
        y="0"
        width="40"
        height="120"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="0"
        rx="15"
        ry="15"
      />

      {/* <!-- Horizontal Pipe: Fully shifted left --> */}
      <rect
        x="80"
        y="80"
        width="120"
        height="40"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="0"
        rx="15"
        ry="15"
      />

      <line x1="80" y1="20" x2="120" y2="20" stroke="black" strokeWidth="3" />
      <line x1="180" y1="80" x2="180" y2="120" stroke="black" strokeWidth="3" />

      <line x1="80" y1="20" x2="80" y2="111" stroke="black" strokeWidth="3" />
      <line x1="120" y1="20" x2="120" y2="80" stroke="black" strokeWidth="3" />

      <line
        x1="118.5"
        y1="80"
        x2="180"
        y2="80"
        stroke="black"
        strokeWidth="3"
      />
      <line x1="89" y1="120" x2="180" y2="120" stroke="black" strokeWidth="3" />

      <path
        d="M 90 120 Q 85 119, 80 110"
        fill="none"
        stroke="black"
        strokeWidth="3"
      />

      {/* <!-- Top Flared End --> */}
      <path
        d="M 80 20 Q 60 0, 100 0 Q 140 0, 120 20"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />

      {/* <!-- Left Flared End --> */}
      <path
        d="M 180 80 Q 200 60, 200 100 Q 200 140, 180 120"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};

export default RightToUp