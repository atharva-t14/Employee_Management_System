import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const AdminDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    email: "",
    phoneNumber: "",
    role: "",
    salary: "",
    sickLeavesAvailable: "",
    casualLeavesAvailable: "",
  });
  const [createFormData, setCreateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    role: "",
    salary: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDistributeModalOpen, setIsDistributeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
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
      setLeaveRequests(leaveRequests.filter((leave) => leave._id !== leaveId));
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const handleViewProfile = (employeeId) => {
    navigate(`/profile/${employeeId}`);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setEditFormData({
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      role: employee.role,
      salary: employee.salary,
      sickLeavesAvailable: employee.sickLeavesAvailable,
      casualLeavesAvailable: employee.casualLeavesAvailable,
    });
    setIsModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axiosInstance.put(
        `/admin/employee/${editingEmployee.employeeId}`,
        editFormData
      );
      setEmployees(
        employees.map((emp) =>
          emp.employeeId === editingEmployee.employeeId ? response.data : emp
        )
      );
      setEditingEmployee(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the employee with Employee ID ${employeeId} and all their data?`
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/admin/employee/${employeeId}`);
        setEmployees(employees.filter((emp) => emp.employeeId !== employeeId));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleCreateEmployee = async () => {
    try {
      const response = await axiosInstance.post(
        "/admin/employee",
        createFormData
      );
      setEmployees([...employees, response.data]);
      setIsCreateModalOpen(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Email already in use"
      ) {
        alert("Email already in use. Please use another email.");
      } else {
        console.error("Error creating employee:", error);
      }
    }
  };

  const handleDistributeSalary = (employee) => {
    setSelectedEmployee(employee);
    setIsDistributeModalOpen(true);
  };

  const handleDistributeFormChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSaveDistribute = async () => {
    try {
      const monthNumber = new Date(`${month}-01`).getMonth() + 1;
      const response = await axiosInstance.post("/admin/distribute-salary", {
        employeeId: selectedEmployee.employeeId,
        month,
        monthNumber,
      });
      setIsDistributeModalOpen(false);
    } catch (error) {
      console.error("Error distributing salary:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Leave Requests</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Employee ID</th>
                {/* <th className="border p-2">Employee Name</th> */}
                <th className="border p-2">Leave Type</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={index}>
                  <td className="border p-2">{leave.employee}</td>
                  {/* <td className="border p-2">{leave.employeeName}</td> */}
                  <td className="border p-2">{leave.leaveType}</td>
                  <td className="border p-2">
                    {new Date(leave.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleApproveLeave(leave._id)}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded"
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
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded mb-4"
          >
            Create New Employee
          </button>
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
                  <td className="border p-2">
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td className="border p-2">{employee.role}</td>
                  <td className="border p-2">{employee.salary}</td>
                  <td className="border p-2 flex flex-row ">
                    <button
                      onClick={() => handleViewProfile(employee.employeeId)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleEditEmployee(employee)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white p-2 rounded ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.employeeId)}
                      className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-2 rounded ml-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDistributeSalary(employee)}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded ml-2"
                    >
                      Distribute Salary
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-bold mb-2">Edit Employee</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={editFormData.phoneNumber}
                onChange={handleEditFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={editFormData.role}
                onChange={handleEditFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Salary</label>
              <input
                type="number"
                name="salary"
                value={editFormData.salary}
                onChange={handleEditFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Sick Leaves Available
              </label>
              <input
                type="number"
                name="sickLeavesAvailable"
                value={editFormData.sickLeavesAvailable}
                onChange={handleEditFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Casual Leaves Available
              </label>
              <input
                type="number"
                name="casualLeavesAvailable"
                value={editFormData.casualLeavesAvailable}
                onChange={handleEditFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded"
            >
              Save
            </button>
          </form>
        </Modal>
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <h3 className="text-lg font-bold mb-2">Create New Employee</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={createFormData.firstName}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={createFormData.lastName}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={createFormData.email}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={createFormData.phoneNumber}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={createFormData.dateOfBirth}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={createFormData.password}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={createFormData.role}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Salary</label>
              <input
                type="number"
                name="salary"
                value={createFormData.salary}
                onChange={handleCreateFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleCreateEmployee}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded"
            >
              Save
            </button>
          </form>
        </Modal>
        <Modal
          isOpen={isDistributeModalOpen}
          onClose={() => setIsDistributeModalOpen(false)}
        >
          <h3 className="text-lg font-bold mb-2">Distribute Salary</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Month</label>
              <input
                type="month"
                value={month}
                onChange={handleDistributeFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveDistribute}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded"
            >
              Distribute
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
