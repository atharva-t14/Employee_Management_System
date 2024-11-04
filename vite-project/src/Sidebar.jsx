import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");
  const username = localStorage.getItem("username"); // Assuming username is stored in localStorage

  return (
    <aside className="bg-slate-800 w-48 min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/profile/${employeeId}`)}
          className="p-2 rounded hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-blue-500 transition-colors text-left text-white"
        >
          My Profile
        </button>
        <button
          onClick={() => navigate(`/attendance/${employeeId}`)}
          className="p-2 rounded hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-blue-500 transition-colors text-left text-white"
        >
          My Attendance
        </button>
        <button
          onClick={() => navigate(`/salary/${employeeId}`)}
          className="p-2 rounded hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-blue-500 transition-colors text-left text-white"
        >
          My Salary
        </button>
        {employeeId == 1234 && (
          <button
            onClick={() => navigate("/admin")}
            className="p-2 rounded hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-blue-500 transition-colors text-left text-white"
          >
            Admin Dashboard
          </button>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
