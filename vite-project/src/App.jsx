// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import SalaryDetails from "./SalaryDetails";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AdminDashboard from "./AdminDashboard";
import useEmployeeId from "./useEmployeeId";
import AttendancePage from "./AttendancePage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated
  const employeeId = useEmployeeId(); // Get the employeeId from local storage

  return (
    // <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* <Route path="/login" element={
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <div className="flex flex-1 items-center justify-center">
                        <LoginPage />
                    </div>
                </div>
            } /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/profile/:employeeId"
        element={
          isAuthenticated && employeeId ? (
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
                  <ProfilePage />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/salary/:employeeId"
        element={
          isAuthenticated && employeeId ? (
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
                  <SalaryDetails />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/attendance/:employeeId"
        element={
          isAuthenticated && employeeId ? (
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
                  <AttendancePage />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAuthenticated && employeeId ? (
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 p-10">
                  <AdminDashboard />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
    // {/* </Router> */ }
  );
};

export default App;
