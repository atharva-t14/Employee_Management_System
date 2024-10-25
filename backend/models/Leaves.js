const mongoose = require('mongoose');

const leavesSchema = new mongoose.Schema({
    // employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    employee: { type: String, required: true },
    date: {
        type: Date, required: true
    },
    leaveType: { type: String, required: true }, // 'Casual' or 'Sick'
    approved: { type: Boolean, default: false }
});

const Leaves = mongoose.model('Leaves', leavesSchema);

module.exports = Leaves;