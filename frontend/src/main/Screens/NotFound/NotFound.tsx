import { Button } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-warning">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Упс! Такой страницы не существует.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <div className="mt-4">
          <Button onClick={() => navigate(`/`)} color="primary" size="md">
            Вернуться обратно
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
