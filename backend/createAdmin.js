const mongoose = require("mongoose");
const Employee = require("./models/Employee");
const Salary = require("./models/Salary");
const Leaves = require("./models/Leaves");

const createAdmin = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vazeswaroop:7oS2X0TDAD6ahidh@secluster.9kpoo.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB...");

    // Check if admin already exists
    const existingAdmin = await Employee.findOne({ employeeId: "1234" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Create admin employee
    const admin = new Employee({
      firstName: "Admin",
      lastName: "User",
      email: "admin@company.com",
      phoneNumber: "1234567890",
      employeeId: "1234",
      dateOfBirth: "1990-01-01",
      password: "admin123", // You should hash this password in production
      role: "admin",
    });

    await admin.save();

    // Create corresponding salary record
    const adminSalary = new Salary({
      employeeId: "1234",
      baseSalary: 100000,
      sickLeavesAlloted: 12,
      sickLeavesTaken: 0,
      casualLeavesAlloted: 12,
      casualLeavesTaken: 0,
    });

    await adminSalary.save();

    // Create corresponding leaves record
    const adminLeaves = new Leaves({
      employee: "1234",
      leaveType: "Initial",
      date: new Date(),
      approved: true,
    });

    await adminLeaves.save();

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();
