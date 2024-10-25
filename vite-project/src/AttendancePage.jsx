import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import { useParams } from 'react-router-dom';

const AttendancePage = () => {
  const { employeeId } = useParams();
  const [leaveData, setLeaveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        console.log(`Fetching leave data for employeeId: ${employeeId}`);
        const response = await axiosInstance.get(`/salary/${employeeId}`);
        console.log('Leave data fetched:', response.data);
        setLeaveData(response.data);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchLeaveData();
    }
  }, [employeeId]);

  const handleTakeLeave = (type) => {
    console.log(`Taking leave of type: ${type}`);
    setLeaveType(type);
    setShowDatePicker(true);
  };

  const handleDateChange = (e) => {
    console.log(`Selected date: ${e.target.value}`);
    setSelectedDate(e.target.value);
  };

  const handleScheduleLeave = async () => {
    try {
      console.log(`Scheduling leave for employeeId: ${employeeId}, type: ${leaveType}, date: ${selectedDate}`);
      // Fixed API endpoint - removed /auth from the path
      const response = await axiosInstance.post(`/leaves/${employeeId}`, {
        leaveType,
        date: selectedDate,
        employeeId // Changed from empId to match backend expectation
      });
      console.log('Leave scheduled:', response.data);

      // Refresh leave data after scheduling
      const updatedLeaveData = await axiosInstance.get(`/salary/${employeeId}/leave`);
      setLeaveData(updatedLeaveData.data);

      setShowDatePicker(false);
      setSelectedDate('');
    } catch (error) {
      console.error('Error scheduling leave:', error);
      // Add user-friendly error handling
      alert('Failed to schedule leave. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Attendance</h2>
        <div className="mb-4">
          <p><strong>Sick Leaves Allotted:</strong> {leaveData.sickLeavesAlloted}</p>
          <p><strong>Sick Leaves Taken:</strong> {leaveData.sickLeavesTaken}</p>
          <p><strong>Casual Leaves Allotted:</strong> {leaveData.casualLeavesAlloted}</p>
          <p><strong>Casual Leaves Taken:</strong> {leaveData.casualLeavesTaken}</p>
        </div>
        <div className="mb-4">
          <button
            onClick={() => handleTakeLeave('sick')}
            className="w-full bg-blue-500 text-white p-2 rounded mb-2"
          >
            Take Sick Leave
          </button>
          <button
            onClick={() => handleTakeLeave('casual')}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Take Casual Leave
          </button>
        </div>
        {showDatePicker && (
          <div className="mb-4">
            <label className="block text-gray-700">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleScheduleLeave}
              className="w-full bg-blue-500 text-white p-2 rounded mt-2"
            >
              Schedule Leave
            </button>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Scheduled Leaves</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Type</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.scheduledLeaves && leaveData.scheduledLeaves.map((leave, index) => (
                <tr key={index}>
                  <td className="border p-2">{leave.type}</td>
                  <td className="border p-2">{new Date(leave.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;