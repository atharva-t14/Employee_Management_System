const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'software engineer' },
  salary: { type: Number, default: 1200000 },
  sickLeavesTaken: { type: Number, default: 0 },
  casualLeavesTaken: { type: Number, default: 0 },
  sickLeavesAvailable: { type: Number, default: 12 },
  casualLeavesAvailable: { type: Number, default: 12 }
});

// Remove the password hashing middleware
// employeeSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;