const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: String, required: true },
    sickLeavesAlloted: { type: Number, required: true },
    sickLeavesTaken: { type: Number, required: true },
    casualLeavesAlloted: { type: Number, required: true },
    casualLeavesTaken: { type: Number, required: true },
    finalSalary: { type: Number, required: true },
    totalDaysPresent: { type: Number, required: true },
    baseSalary: { type: Number, required: true, default: 1500000 },
    deductions: { type: Number, required: true },
    taxSlab: { type: String, required: true },
    tax: { type: Number, required: true },
    netSalary: { type: Number, required: true }
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
