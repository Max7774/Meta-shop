import React, { useState } from "react";

const Loader = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loaderSize, setLoaderSize] = useState({
    height: "25px",
    width: "35px",
  });

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          display: "block",
          shapeRendering: "auto",
        }}
        width={loaderSize.width}
        height={loaderSize.height}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M7 50A43 43 0 0 0 93 50A43 49.2 0 0 1 7 50"
          fill="#D7E8BA"
          stroke="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="0.5181347150259068s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 53.1;360 50 53.1"
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
};

export default Loader;
