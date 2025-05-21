import React, {useState} from 'react'

const Start = ({ width = "100%", height = "100%", isOilFlowing }) => {
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
        height="110"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="0"
      />

      <line
        x1="120"
        y1="80"
        x2="120"
        y2="180"
        stroke="black"
        strokeWidth="3"
      />
      <line
        x1="78.5"
        y1="80"
        x2="121.5"
        y2="80"
        stroke="black"
        strokeWidth="3"
      />

      <line x1="80" y1="80" x2="80" y2="180" stroke="black" strokeWidth="3" />
      <line
        x1="80"
        y1="180"
        x2="120"
        y2="180"
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
    </svg>
  );
}

export default Start