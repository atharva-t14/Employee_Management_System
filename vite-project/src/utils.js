// utils.js
import axios from 'axios';

export const fetchEmployeeId = async (email) => {
    try {
        const response = await axios.post('http://localhost:3000/getEmployeeId', { email });
        return response.data.employeeId;
    } catch (error) {
        console.error('Error fetching employee ID:', error);
        throw error;
    }
};