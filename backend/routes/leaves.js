const express = require('express');
const mongoose = require('mongoose');
const Leaves = require('../models/Leaves');
const Employee = require('../models/Employee');
const Salary = require('../models/Salary');

const router = express.Router();

// Create a new leave
router.post('/:employeeId', async (req, res) => {
    try {
        const { leaveType, date } = req.body;
        const { employeeId } = req.params;

        // Find the employee by ID
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Create a new leave
        const newLeave = new Leaves({
            employee: employeeId,
            date,
            leaveType
        });

        // Save the leave to the database
        await newLeave.save();

        // Update the leave taken count in Employee schema
        if (leaveType === 'sick') {
            employee.sickLeavesTaken += 1;
        } else if (leaveType === 'casual') {
            employee.casualLeavesTaken += 1;
        }
        await employee.save();

        // Update the leave taken count in Salary schema
        const salary = await Salary.findOne({ employeeId });
        if (salary) {
            if (leaveType === 'sick') {
                salary.sickLeavesTaken += 1;
            } else if (leaveType === 'casual') {
                salary.casualLeavesTaken += 1;
            }
            await salary.save();
        }

        res.status(201).json(newLeave);
    } catch (error) {
        console.error('Error creating leave:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all leaves by employeeId
router.get('/all/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Find all leaves by employeeId
        const leaves = await Leaves.find({ employee: employeeId });

        res.status(200).json(leaves);
    } catch (error) {
        console.error('Error fetching leaves:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;