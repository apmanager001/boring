import React, {useState} from 'react'

const Cross = ({ width = "100%", height = "100%", isOilFlowing }) => {
  // const [isOilFlowing, setIsOilFlowing] = useState(false);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- Cross Outline (Main Shape) --> */}
      <rect
        x="20"
        y="80"
        width="160"
        height="40"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />
      <rect
        x="80"
        y="20"
        width="40"
        height="160"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="0"
      />

      <rect
        x="20"
        y="80"
        width="160"
        height="40"
        fill={isOilFlowing ? "black" : "gray"}
      />
      <rect
        x="80"
        y="20"
        width="40"
        height="160"
        fill={isOilFlowing ? "black" : "gray"}
      />

      <line x1="80" y1="20" x2="120" y2="20" stroke="black" strokeWidth="3" />
      <line x1="80" y1="20" x2="80" y2="80" stroke="black" strokeWidth="3" />
      <line x1="120" y1="20" x2="120" y2="80" stroke="black" strokeWidth="3" />

      <line x1="80" y1="120" x2="80" y2="200" stroke="black" strokeWidth="3" />
      <line
        x1="120"
        y1="120"
        x2="120"
        y2="200"
        stroke="black"
        strokeWidth="3"
      />
      <line x1="80" y1="180" x2="120" y2="180" stroke="black" strokeWidth="3" />

      {/* <!-- Top Flared End --> */}
      <path
        d="M 80 20 Q 60 0, 100 0 Q 140 0, 120 20"
        fill={isOilFlowing ? "black" : "gray"}
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

      {/* <!-- Right Flared End --> */}
      <path
        d="M 180 80 Q 200 60, 200 100 Q 200 140, 180 120"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Cross