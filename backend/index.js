const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const salaryRoutes = require("./routes/salary");
const leavesRoutes = require("./routes/leaves");
const adminRoutes = require("./routes/admin");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONOGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(
  MONOGO_URI,
  {
  },
);

app.use("/api/auth", authRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/leaves", leavesRoutes);
app.use("/api/admin", adminRoutes);

app.get("/profile/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.id,
    }).select("-password");
    if (!employee) {
      return res.status(404).send("Profile not found");
    }
    res.json(employee);
  } catch (err) {
    res.status(500).send("Server error");
  }
});
/*

*/

app.get("/salary/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const salaryDetails = await Salary.findOne({ employeeId: id });
    if (!salaryDetails) {
      return res.status(404).json({ message: "Salary details not found" });
    }
    res.json(salaryDetails);
  } catch (error) {
    console.error("Error fetching salary data:", error);
    res.status(500).send("Server error");
  }
});

app.get("/leaves/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const leaves = await Leaves.find({ employee: employeeId });
    if (!leaves) {
      return res.status(404).json({ message: "Leaves not found" });
    }
    res.json(leaves);
  } catch (error) {
    console.error("Error fetching leaves data:", error);
    res.status(500).send("Server error");
  }
});

// // Fetch all employees
// app.get("/api/admin/employees", async (req, res) => {
//   try {
//     const employees = await Employee.find().select("-password");
//     res.json(employees);
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     res.status(500).send("Server error");
//   }
// });

// Fetch all leave requests
// app.get("/api/admin/leave-requests", async (req, res) => {
//   try {
//     const leaveRequests = await Leaves.find();
//     res.json(leaveRequests);
//   } catch (error) {
//     console.error("Error fetching leave requests:", error);
//     res.status(500).send("Server error");
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
