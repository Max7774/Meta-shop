import clsx from "clsx";
import { FC, useEffect, useState } from "react";

const Loader: FC<{
  size: "sm" | "md" | "lg";
  isLoading?: boolean;
  color: "white" | "primary" | "secondary";
  className?: string;
}> = ({ size, isLoading, color, className }) => {
  const [sizeLoader, setSizeLoader] = useState({
    height: "90px",
    width: "90px",
  });
  useEffect(() => {
    if (size === "sm") {
      setSizeLoader({ height: "24px", width: "40px" });
    } else if (size === "md") {
      setSizeLoader({ height: "28px", width: "78px" });
    } else if (size === "lg") {
      setSizeLoader({ height: "120px", width: "120px" });
    }
  }, [size]);

  const loaderClasses = clsx(
    { "opacity-0": !isLoading },
    "transition-opacity",
    "duration-300",
    "m-0",
    "mx-auto",
    "block",
    "shape-rendering-auto"
  );

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: "auto", display: "block", shapeRendering: "auto" }}
        className={loaderClasses}
        width={sizeLoader.width}
        height={sizeLoader.height}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          fill="none"
          stroke={
            color === "primary"
              ? "#611C35"
              : color === "secondary"
              ? "#2E5077"
              : color
          }
          strokeWidth="8"
          strokeDasharray="42.76482137044271 42.76482137044271"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0;256.58892822265625"
          ></animate>
        </path>
      </svg>
    </div>
  );
};

export default Loader;
