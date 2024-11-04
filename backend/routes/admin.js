const express = require('express');
const mongoose = require('mongoose');
const Leaves = require('../models/Leaves');
const Employee = require('../models/Employee');
const Salary = require('../models/Salary');

const router = express.Router();

// Fetch all leave requests that are not approved
router.get('/leave-requests', async (req, res) => {
    try {
        const leaveRequests = await Leaves.find({ approved: false });
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find().select("-password");
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve a leave request
router.post('/approve-leave/:leaveId', async (req, res) => {
    try {
        const { leaveId } = req.params;
        const leave = await Leaves.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        leave.approved = true;
        await leave.save();
        res.status(200).json({ message: 'Leave request approved' });
    } catch (error) {
        console.error('Error approving leave request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update employee information
router.put('/employee/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        const updateData = req.body;

        const employee = await Employee.findOneAndUpdate({ employeeId }, updateData, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete an employee and all related records
router.delete('/employee/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findOneAndDelete({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await Salary.deleteMany({ employeeId });
        await Leaves.deleteMany({ employee: employeeId });

        res.status(200).json({ message: 'Employee and related records deleted' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new employee
router.post('/employee', async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, dateOfBirth, password, role, salary } = req.body;

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Generate a random employee ID
        let employeeId;
        let isUnique = false;
        while (!isUnique) {
            employeeId = Math.floor(Math.random() * 1000) + 1;
            const existingId = await Employee.findOne({ employeeId });
            if (!existingId) {
                isUnique = true;
            }
        }

        // Create new employee
        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            phoneNumber,
            employeeId,
            dateOfBirth,
            password,
            role,
            salary
        });

        await newEmployee.save();

        // Create corresponding salary schema
        const newSalary = new Salary({
            employeeId,
            baseSalary: salary
        });

        await newSalary.save();

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Distribute salary for the month
router.post('/distribute-salary', async (req, res) => {
    try {
        const { employeeId, month, monthNumber } = req.body;

        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const baseSalary = employee.salary;
        let taxSlab, tax;

        if (baseSalary <= 500000) {
            taxSlab = 'No Tax';
            // tax = 0;
        } else if (baseSalary <= 800000) {
            taxSlab = '5%';
            // tax = baseSalary * 0.05;
        } else if (baseSalary <= 1500000) {
            taxSlab = '10%';
            // tax = baseSalary * 0.10;
        } else {
            taxSlab = '20%';
            // tax = baseSalary * 0.20;
        }
        if (baseSalary > 1500000) {
            // taxSlab = 'No Tax';
            tax = (baseSalary - 1500000) * 0.2 + 700000 * 0.1 + 300000 * 0.05;
        } else if (baseSalary <= 800000 && baseSalary > 500000) {
            tax = (baseSalary - 500000) * 0.05;
            // taxSlab = '5%';
            // tax = baseSalary * 0.05;
        } else if (baseSalary <= 1500000 && baseSalary > 800000) {
            tax = (baseSalary - 800000) * 0.1 + 30000;
            // taxSlab = '10%';
            tax = baseSalary * 0.10;
        } else {
            tax = 0;
            // taxSlab = '20%';
            // tax = baseSalary * 0.20;
        }

        const finalSalary = (baseSalary - tax) / 12;

        const newSalary = new Salary({
            employeeId,
            month,
            monthNumber,
            sickLeavesAlloted: employee.sickLeavesAlloted,
            sickLeavesTaken: employee.sickLeavesTaken,
            casualLeavesAlloted: employee.casualLeavesAlloted,
            casualLeavesTaken: employee.casualLeavesTaken,
            finalSalary,
            totalDaysPresent: 20, // Assuming 20 days present for simplicity
            baseSalary,
            deductions: tax,
            taxSlab,
            tax,
            netSalary: finalSalary
        });

        await newSalary.save();
        res.status(201).json(newSalary);
    } catch (error) {
        console.error('Error distributing salary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;