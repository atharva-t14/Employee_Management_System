const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    // employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    employeeId: { type: 'String', required: true },
    month: { type: String },// previously it was required - have not made changes to the code written before based on required = true
    monthNumber: { type: Number, required: true, min: 0, max: 12, default: 0 },
    sickLeavesAlloted: { type: Number, required: true, default: 12 },
    sickLeavesTaken: { type: Number, required: true, default: 0 },
    casualLeavesAlloted: { type: Number, required: true, default: 12 },
    casualLeavesTaken: { type: Number, required: false, default: 0 },
    finalSalary: { type: Number, required: true, default: 0 },
    totalDaysPresent: { type: Number, required: true, default: 0 },
    baseSalary: { type: Number, required: true },
    deductions: { type: Number, required: false },
    taxSlab: { type: String, required: true, default: 'Default' },
    tax: { type: Number, required: false },
    netSalary: { type: Number, required: false }
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
