const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../index");
const Employee = require("../models/Employee");
const mongoose = require("mongoose");

describe("Backend API Tests", () => {
  before(async () => {
    // Connect to test database
    await mongoose.connect(
      "mongodb+srv://vazeswaroop:7oS2X0TDAD6ahidh@secluster.9kpoo.mongodb.net/test?retryWrites=true&w=majority"
    );
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Test 1: Get all employees
  describe("GET /api/admin/employees", () => {
    it("should return all employees", async () => {
      const res = await request(app).get("/api/admin/employees");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("email");
      expect(res.body[0]).to.not.have.property("password");
    });
  });

  // Test 2: Get leave requests
  describe("GET /api/admin/leave-requests", () => {
    it("should return all leave requests", async () => {
      const res = await request(app).get("/api/admin/leave-requests");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  // Test 3: User authentication
  describe("POST /api/auth/login", () => {
    it("should authenticate valid user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      expect(res.body).to.have.property("employeeId");
    });

    it("should reject invalid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "wrongpassword",
      });

      expect(res.status).to.equal(401);
    });
  });
});
