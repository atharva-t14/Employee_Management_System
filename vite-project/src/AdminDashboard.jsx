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
                const response = await axiosInstance.get('/admin/leave-requests');
                setLeaveRequests(response.data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get('/admin/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchLeaveRequests();
        fetchEmployees();
    }, []);

    const handleApproveLeave = async (leaveId) => {
        try {
            await axiosInstance.post(`/admin/approve-leave/${leaveId}`);
            setLeaveRequests(leaveRequests.filter(request => request.id !== leaveId));
        } catch (error) {
            console.error('Error approving leave:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 flex-1">
            <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>
                <div className="space-y-4">
                    {leaveRequests.map((request) => (
                        <div
                            key={request.id}
                            className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <p><strong>Type:</strong> {request.type}</p>
                                <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => handleApproveLeave(request.id)}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Approve
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Employees</h3>
                <div className="space-y-4">
                    {employees.map((employee) => (
                        <div
                            key={employee.employeeId}
                            className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
                                <p><strong>Email:</strong> {employee.email}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/profile/${employee.employeeId}`)}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;