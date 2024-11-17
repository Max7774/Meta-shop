interface IToggleButtonProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const ToggleButton = ({ isCollapsed, toggleSidebar }: IToggleButtonProps) => {
  const Icon = isCollapsed ? (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12H9m6 0l-3 3m3-3l-3-3"
      />
    </svg>
  ) : (
    <svg
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 0l3-3m-3 3l3 3"
      />
    </svg>
  );

  return (
    <button
      onClick={toggleSidebar}
      className="fixed bottom-4 left-4 bg-gray-200 text-gray-600 rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-90 focus:outline-none"
    >
      {Icon}
    </button>
  );
};

export default ToggleButton;
