import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./components/AdminDashboard";
import Employee from "./components/Employee"; // Employee component
import Attendance from "./components/Attendance"; // Attendance component
import OT from "./components/OT"; // OT component
import Profile from "./components/Profile"; // Profile component
import PayRoll from "./components/PayRoll"; // PayRoll component
import LoginForm from "./components/LoginForm"; // Login component
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import Tasks from "./components/Employee/Tasks";
import Salary from "./components/Employee/Salary";
import EmpProfile from "./components/Employee/EmpProfile";
import EmpAttendance from "./components/Employee/EmpAttendance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="admin-dashboard" element={<AdminDashboard />}>
        <Route path="employee" element={<Employee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="ot" element={<OT />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payroll" element={<PayRoll />} />
      </Route>
      <Route path="/employee-dashboard/*" element={<EmployeeDashboard />}>
        <Route path="profile" element={<EmpProfile />} />
        <Route path="attendance" element={<EmpAttendance />} />
        <Route path="salary" element={<Salary />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
