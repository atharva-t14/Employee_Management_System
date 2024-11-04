const Salary = require('../models/Salary');
const express = require('express');
const router = express.Router();


// Fetch salary details for an employee for the last 12 months
router.get('/salaries/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        const salaries = await Salary.find({ employeeId }).sort({ month: -1 }).limit(12);
        res.status(200).json(salaries);
    } catch (error) {
        console.error('Error fetching salary details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch salary details by employeeId
router.get('/:employeeId', async (req, res) => {
    try {
        const salaryDetails = await Salary.findOne({ employeeId: req.params.employeeId });
        if (!salaryDetails) {
            return res.status(404).json({ message: 'Salary details not found' });
        }
        res.status(200).json(salaryDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Schedule leave
router.post('/:employeeId/leave', async (req, res) => {
    try {
        const { type, date } = req.body;
        console.log(`Scheduling leave for employeeId: ${req.params.employeeId}, type: ${type}, date: ${date}`);
        console.log("hi");
        const salaryDetails = await Salary.findOne({ employeeId: req.params.employeeId });

        if (!salaryDetails) {
            return res.status(404).json({ message: 'Salary details not found' });
        }
        console.log("hi");

        salaryDetails.scheduledLeaves = salaryDetails.scheduledLeaves || [];
        console.log(salaryDetails.scheduledLeaves);
        salaryDetails.scheduledLeaves.push({ type, date });

        if (type === 'sick') {
            salaryDetails.sickLeavesTaken += 1;
        } else if (type === 'casual') {
            salaryDetails.casualLeavesTaken += 1;
        }

        await salaryDetails.save();
        res.status(200).json(salaryDetails);
    } catch (error) {
        console.error('Error scheduling leave:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
