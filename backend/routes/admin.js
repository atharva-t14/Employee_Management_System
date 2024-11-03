const express = require('express');
const mongoose = require('mongoose');
const Leaves = require('../models/Leaves');
const Employee = require('../models/Employee');

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

module.exports = router;