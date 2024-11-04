// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig"; // Import the configured axios instance

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", loginData); // Log the login data
    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      console.log("Response data:", response.data); // Log the response data
      const { token, employeeId } = response.data;
      if (token && employeeId) {
        localStorage.setItem("token", token);
        localStorage.setItem("employeeId", employeeId);
        // Redirect to the profile page with the employee ID
        console.log(`Navigating to /profile/${employeeId}`);
        navigate(`/profile/${employeeId}`);
        console.log("Logged in successfully!");
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Log in to your profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-purple-500 hover:to-blue-500 text-white p-2 rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
