import React,{useState} from 'react'

const LeftToDown = ({ width = "100%", height = "100%", isOilFlowing }) => {
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
        y="80"
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
        x="0"
        y="80"
        width="120"
        height="40"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="0"
        rx="15"
        ry="15"
      />

      <line x1="20" y1="80" x2="110" y2="80" stroke="black" strokeWidth="3" />
      <line x1="120" y1="90" x2="120" y2="180" stroke="black" strokeWidth="3" />

      <line x1="20" y1="80" x2="20" y2="120" stroke="black" strokeWidth="3" />
      <line
        x1="20"
        y1="120"
        x2="81.5"
        y2="120"
        stroke="black"
        strokeWidth="3"
      />

      <line x1="80" y1="120" x2="80" y2="180" stroke="black" strokeWidth="3" />
      <line x1="80" y1="180" x2="120" y2="180" stroke="black" strokeWidth="3" />

      <path
        d="M 110 80 Q 120 80, 120 100"
        fill="none"
        stroke="black"
        strokeWidth="3"
      />

      {/* <!-- Bottom Flared End --> */}
      <path
        d="M 80 180 Q 60 200, 100 200 Q 140 200, 120 180"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />

      {/* <!-- Left Flared End --> */}
      <path
        d="M 20 80 Q 0 60, 0 100 Q 0 140, 20 120"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};

export default LeftToDown