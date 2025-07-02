import React from "react";

const ToastNotification = ({ message, show, onClose }) => {
  if (!show) return null;
  return (
    <div
      className="fixed top-6 right-6 z-50 max-w-xs w-full bg-white border border-blue-400 shadow-lg rounded-lg px-6 py-4 flex items-center animate-fade-in-up"
      style={{ right: "1.5rem" }}
    >
      <span className="text-blue-700 font-semibold mr-4 break-words flex-1">
        {message}
      </span>
      <button
        className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
