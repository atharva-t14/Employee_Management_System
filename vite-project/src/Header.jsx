import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <header className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Salary Stream
      </h1>
      <nav className="flex gap-6">
        {isAuthenticated ? (
          <>
            {/* <a href="/employee" className="hover:text-blue-200">Employee</a>
                        <a href="/admin" className="hover:text-blue-200">Admin</a> */}
            <button onClick={handleLogout} className="hover:text-blue-200">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className="hover:text-blue-200">
              Login
            </button>
            <button onClick={handleSignup} className="hover:text-blue-200">
              Signup
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
