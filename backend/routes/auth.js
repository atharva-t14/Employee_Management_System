const express = require("express");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const Salary = require("../models/Salary");
const Leaves = require("../models/Leaves");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Sign-up route
// router.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, phoneNumber, employeeId, dateOfBirth, password } = req.body;

//   try {
//     const existingEmployee = await Employee.findOne({ email });
//     if (existingEmployee) {
//       return res.status(400).json({ message: 'Employee already exists' });
//     }

//     const newEmployee = new Employee({
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       employeeId,
//       dateOfBirth,
//       password, // Store password in plain text
//     });

//     await newEmployee.save();

//     const token = jwt.sign({ userId: newEmployee._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    employeeId,
    dateOfBirth,
    password,
  } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      phoneNumber,
      employeeId,
      dateOfBirth,
      password, // Store password in plain text
    });

    await newEmployee.save();

    // Create initial salary object
    const newSalary = new Salary({
      employeeId: newEmployee.employeeId,
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      sickLeavesAlloted: 12,
      sickLeavesTaken: 0,
      casualLeavesAlloted: 12,
      casualLeavesTaken: 0,
      finalSalary: newEmployee.salary,
      totalDaysPresent: 0,
      baseSalary: newEmployee.salary,
      deductions: 0,
      taxSlab: "None",
      tax: 0,
      netSalary: newEmployee.salary,
    });

    await newSalary.save();

    // Create initial leaves object
    const newLeaves = new Leaves({
      employee: newEmployee.employeeId,
      date: new Date(),
      leaveType: "Initial",
      approved: true,
    });

    await newLeaves.save();

    const token = jwt.sign({ userId: newEmployee._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, employeeId: newEmployee.employeeId });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", req.body); // Log the request body

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (password !== employee.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: employee._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, employeeId: employee.employeeId });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch employee information by employeeId
router.get("/profile/:employeeId", async (req, res) => {
  // changed employee to profile in this line
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId,
    }).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
