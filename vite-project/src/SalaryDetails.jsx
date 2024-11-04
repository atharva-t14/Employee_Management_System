import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalaryDetails = () => {
  const { employeeId } = useParams();
  const [salaryDetails, setSalaryDetails] = useState([]);

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/salary/salaries/${employeeId}`
        );
        setSalaryDetails(response.data);
      } catch (error) {
        console.error("Error fetching salary details:", error);
      }
    };

    if (employeeId) {
      fetchSalaryDetails();
    }
  }, [employeeId]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Salary Report", 20, 10);
    doc.autoTable({
      head: [
        [
          "Month",
          "Base Salary (Yearly)",
          "Tax Slab",
          "Tax Deducted",
          "Salary for the Month",
        ],
      ],
      body: salaryDetails.map((salary) => [
        salary.month,
        salary.baseSalary,
        salary.taxSlab,
        salary.tax,
        salary.finalSalary,
      ]),
    });
    doc.save("salary_report.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Salary Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Month</th>
              <th className="border p-2">Base Salary (Yearly)</th>
              <th className="border p-2">Tax Slab</th>
              <th className="border p-2">Tax Deducted</th>
              <th className="border p-2">Salary for the Month</th>
            </tr>
          </thead>
          <tbody>
            {salaryDetails.map((salary, index) => (
              <tr key={index}>
                <td className="border p-2">{salary.month}</td>
                <td className="border p-2">{salary.baseSalary}</td>
                <td className="border p-2">{salary.taxSlab}</td>
                <td className="border p-2">{salary.tax}</td>
                <td className="border p-2">{salary.finalSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded mt-4"
        >
          Download Salary Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default SalaryDetails;

// const SalaryDetails = () => {
//     return (
//         <></>);
// };
//   const { employeeId } = useParams();
//   const [salaryDetails, setSalaryDetails] = useState(null);
//   const [deductions, setDeductions] = useState(0);
//   const [finalSalary, setFinalSalary] = useState(0);
//   const [month, setMonth] = useState(
//     new Date().toLocaleString("default", { month: "long", year: "numeric" })
//   ); // Default to current month

//   useEffect(() => {
//     const fetchSalaryDetails = async () => {
//       try {
//         const response = await axiosInstance.get(`/salary/${employeeId}`);
//         setSalaryDetails(response.data);
//         setFinalSalary(response.data.baseSalary); // Initialize final salary with base salary
//       } catch (error) {
//         console.error("Error fetching salary details:", error);
//       }
//     };

//     if (employeeId) {
//       fetchSalaryDetails();
//     }
//   }, [employeeId]);

//   const handleDeductionsChange = (e) => {
//     const value = parseFloat(e.target.value) || 0;
//     setDeductions(value);

//     if (salaryDetails) {
//       let tempbasesalary = salaryDetails.baseSalary;
//       if (salaryDetails.sickLeavesTaken > salaryDetails.sickLeavesAlloted) {
//         tempbasesalary -=
//           (salaryDetails.baseSalary / 20) *
//           (salaryDetails.sickLeavesTaken - salaryDetails.sickLeavesAlloted);
//       }

//       if (salaryDetails.casualLeavesTaken > salaryDetails.casualLeavesAlloted) {
//         tempbasesalary -=
//           (salaryDetails.baseSalary / 20) *
//           (salaryDetails.casualLeavesTaken - salaryDetails.casualLeavesAlloted);
//       }
//       let tax = 0;
//       const newtempbasesalary = tempbasesalary - value;
//       tempbasesalary = tempbasesalary - value;

//       if (tempbasesalary > 1500000) {
//         tax += (tempbasesalary - 1500000) * 0.3;
//         tempbasesalary = 1500000;
//       }
//       if (tempbasesalary > 1200000) {
//         tax += (tempbasesalary - 1200000) * 0.2;
//         tempbasesalary = 1200000;
//       }
//       if (tempbasesalary > 1000000) {
//         tax += (tempbasesalary - 1000000) * 0.15;
//         tempbasesalary = 1000000;
//       }
//       if (tempbasesalary > 900000) {
//         tax += (tempbasesalary - 900000) * 0.15;
//         tempbasesalary = 900000;
//       }
//       if (tempbasesalary > 600000) {
//         tax += (tempbasesalary - 600000) * 0.1;
//         tempbasesalary = 600000;
//       }
//       if (tempbasesalary > 500000) {
//         tax += (tempbasesalary - 500000) * 0.05;
//         tempbasesalary = 500000;
//       }
//       if (tempbasesalary > 300000) {
//         tax += (tempbasesalary - 300000) * 0.05;
//       }

//       salaryDetails.taxes = tax;

//       const calculatedFinalSalary = (newtempbasesalary - tax) / 12;
//       setFinalSalary(calculatedFinalSalary);
//     }
//   };

//   if (!salaryDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">My Salary</h2>
//         <div className="mb-4">
//           <p>
//             <strong>Month:</strong> {month}
//           </p>
//         </div>
//         <div className="mb-4">
//           <p>
//             <strong>Base Salary:</strong> Rs. {salaryDetails.baseSalary}
//           </p>
//           <p>
//             <strong>Sick Leaves Allotted:</strong>{" "}
//             {salaryDetails.sickLeavesAlloted}
//           </p>
//           <p>
//             <strong>Sick Leaves Taken:</strong> {salaryDetails.sickLeavesTaken}
//           </p>
//           <p>
//             <strong>Casual Leaves Allotted:</strong>{" "}
//             {salaryDetails.casualLeavesAlloted}
//           </p>
//           <p>
//             <strong>Casual Leaves Taken:</strong>{" "}
//             {salaryDetails.casualLeavesTaken}
//           </p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">
//             Deductions (Non-Taxable Portion)
//           </label>
//           <input
//             type="number"
//             value={deductions}
//             onChange={handleDeductionsChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <p>
//             <strong>Tax:</strong> Rs. {salaryDetails.taxes}
//           </p>
//           <p>
//             <strong>Final Salary:</strong> Rs. {finalSalary}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalaryDetails;
