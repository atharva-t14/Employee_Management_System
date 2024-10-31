// SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig'; // Import the configured axios instance

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        employeeId: '',
        dateOfBirth: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            console.log('Account created successfully:', response.data);
            navigate(`/profile/${response.data.employeeId}`);
            // Redirect to login page or show success message
        } catch (error) {
            console.error('Error creating account:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            placeholder="Employee ID"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            placeholder="Date of Birth"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="Salary"
                            // value={}
                            // onChange={handleChange}
                            placeholder="Salary"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="role"
                            // value={}
                            // onChange={handleChange}
                            placeholder="Role"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
