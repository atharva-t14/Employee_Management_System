import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");
  const username = localStorage.getItem("username"); // Assuming username is stored in localStorage

  return (
    <aside className="bg-blue-100 w-48 min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/profile/${employeeId}`)}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-left"
        >
          My Profile
        </button>
        <button
          onClick={() => navigate(`/attendance/${employeeId}`)}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-left"
        >
          My Attendance
        </button>
        <button
          onClick={() => navigate(`/salary/${employeeId}`)}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-left"
        >
          My Salary
        </button>
        {employeeId == 1234 && (
          <button
            onClick={() => navigate("/admin")}
            className="p-2 rounded hover:bg-gray-200 transition-colors text-left"
          >
            Admin Dashboard
          </button>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
