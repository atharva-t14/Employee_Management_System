const express = require('express');
const mongoose = require('mongoose');
const Leaves = require('../models/Leaves');
const Employee = require('../models/Employee');

const router = express.Router();

// Create a new leave
router.post('/:employeeId', async (req, res) => {
    try {
        const { leaveType, date } = req.body;
        const { employeeId } = req.params;

        // Convert employeeId to ObjectId
        // const objectId = new mongoose.Types.ObjectId(employeeId);

        // Find the employee by ID
        // const employee = await Employee.findById(objectId);
        // if (!employee) {
        //     return res.status(404).json({ message: 'Employee not found' });
        // }

        // Create a new leave
        const newLeave = new Leaves({
            employee: employeeId,
            date,
            leaveType
        });

        // Save the leave to the database
        await newLeave.save();

        res.status(201).json(newLeave);
    } catch (error) {
        console.error('Error creating leave:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;