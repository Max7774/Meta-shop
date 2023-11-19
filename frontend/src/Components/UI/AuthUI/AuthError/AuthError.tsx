import { useEffect, FC, useRef, useState } from "react";

const AuthError: FC<{ error: string | undefined }> = ({ error }) => {
  const err = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLDivElement | null>(null);
  const [errors, setErr] = useState("");

  useEffect(() => {
    if (error === "") {
      const close = () => {
        animate(true);
        setTimeout(() => {
          animate(true);
          setErr("");
        }, 200);
      };
      close();
    } else {
      animate(false);
      setErr(String(error));
    }
  }, [error]);

  const animate = (isClosing: boolean) => {
    if (err.current && currentRef.current) {
      err.current.classList.toggle("opacity-0", isClosing);
      currentRef.current.classList.toggle("-translate-y-4", isClosing);
    }
  };

  return (
    <div ref={currentRef} className="animation-opacity duration-200">
      <div
        ref={err}
        onChange={(event) => event.stopPropagation()}
        className="animation-opacity text-red mt-1 text-sm duration-200"
      >
        {errors}
      </div>
    </div>
  );
};

export default AuthError;
