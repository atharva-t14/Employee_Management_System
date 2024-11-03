import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axiosInstance.get("/admin/leave-requests");
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/admin/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchLeaveRequests();
    fetchEmployees();
  }, []);

  const handleApproveLeave = async (leaveId) => {
    try {
      await axiosInstance.post(`/admin/approve-leave/${leaveId}`);
      setLeaveRequests(leaveRequests.filter(leave => leave._id !== leaveId));
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const handleViewProfile = (employeeId) => {
    navigate(`/profile/${employeeId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Leave Requests</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Employee ID</th>
                <th className="border p-2">Leave Type</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={index}>
                  <td className="border p-2">{leave.employee}</td>
                  <td className="border p-2">{leave.leaveType}</td>
                  <td className="border p-2">{new Date(leave.date).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleApproveLeave(leave._id)}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">All Employees</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Employee ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="border p-2">{employee.employeeId}</td>
                  <td className="border p-2">{employee.firstName} {employee.lastName}</td>
                  <td className="border p-2">{employee.role}</td>
                  <td className="border p-2">{employee.salary}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleViewProfile(employee.employeeId)}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
