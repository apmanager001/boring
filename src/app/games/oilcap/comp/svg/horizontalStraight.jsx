import React, {useState} from 'react'

const HorizontalStraight = ({
  width = "100%",
  height = "100%",
  isOilFlowing,
}) => {
  // const [isOilFlowing, setIsOilFlowing] = useState(false);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- Pipe body --> */}
      <rect
        x="20"
        y="80"
        width="160"
        height="40"
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

export default HorizontalStraight