import React, {useState} from 'react'

const VerticalStraight = ({
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
        x="80"
        y="20"
        width="40"
        height="160"
        fill={isOilFlowing ? "black" : "gray"}
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

      {/* <!-- Bottom Flared End --> */}
      <path
        d="M 80 180 Q 60 200, 100 200 Q 140 200, 120 180"
        fill={isOilFlowing ? "black" : "gray"}
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};

export default VerticalStraight