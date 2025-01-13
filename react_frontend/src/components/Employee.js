import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Employee() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "山田",
      email: "yamada@gmail.com",
      position: "Manager",
      number: "001",
      empid: "EMP001",
      dob: "1990-01-01",
      nrc: "NRC123456",
      gender: "Male",
      maritalStatus: "Single",
      phone: "123-456-7890",
      address: "Tokyo, Japan",
      education: "Bachelor's Degree",
      workExp: "5 years",
      joinDate: "2015-03-15",
      resignDate: "",
    },
    {
      id: 2,
      name: "小林",
      email: "kobayashi@gmail.com",
      position: "Developer",
      number: "002",
      empid: "EMP002",
      dob: "1992-05-10",
      nrc: "NRC987654",
      gender: "Female",
      maritalStatus: "Married",
      phone: "987-654-3210",
      address: "Osaka, Japan",
      education: "Master's Degree",
      workExp: "3 years",
      joinDate: "2018-06-20",
      resignDate: "",
    },
  ]);
  

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    number: "",
    empid: "",
    dob: "",
    nrc: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    address: "",
    education: "",
    workExp: "",
    joinDate: "",
    resignDate: "",
  });

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);

  const positions = [
    "Manager",
    "Developer",
    "Designer",
    "Tester",
    "HR",
    "Intern",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingEmployee) {
      setEditingEmployee({ ...editingEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.email && newEmployee.position) {
      const newEmployeeData = {
        id: employees.length + 1,
        ...newEmployee,
      };
      setEmployees([...employees, newEmployeeData]);
      setNewEmployee({
        name: "",
        email: "",
        position: "",
        number: "",
        empid: "",
        dob: "",
        nrc: "",
        gender: "",
        maritalStatus: "",
        phone: "",
        address: "",
        education: "",
        workExp: "",
        joinDate: "",
        resignDate: "",
      });
      setIsRegisterScreen(false);
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setEditingEmployee(employeeToEdit);
    setIsRegisterScreen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      editingEmployee.name &&
      editingEmployee.email &&
      editingEmployee.position
    ) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editingEmployee.id ? editingEmployee : employee
      );
      setEmployees(updatedEmployees);
      setEditingEmployee(null);
      setIsRegisterScreen(false);
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleRegisterClick = () => {
    setIsRegisterScreen(true);
    setEditingEmployee(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Management System</h2>

      {!isRegisterScreen ? (
        <div>
          <button
            className="btn btn-primary mb-4"
            onClick={handleRegisterClick}
          >
            Register New Employee
          </button>

          <div>
  <h3>Employee List</h3>
  <table className="table table-bordered table-hover">
  <thead className="table-primary">
    <tr>
      <th className="text-center">ID</th>
      <th className="text-center">Name</th>
      <th className="text-center">Email</th>
      <th className="text-center">Position</th>
      <th className="text-center">Employee ID</th>
      <th className="text-center">Date of Birth</th>
      <th className="text-center">NRC</th>
      <th className="text-center">Gender</th>
      <th className="text-center">Marital Status</th>
      <th className="text-center" style={{ minWidth: "150px" }}>Phone</th>
      <th className="text-center">Address</th>
      <th className="text-center">Education</th>
      <th className="text-center">Work Experience</th>
      <th className="text-center">Join Date</th>
      <th className="text-center">Resign Date</th>
      <th className="text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.position}</td>
        <td>{employee.empid}</td>
        <td>{employee.dob}</td>
        <td>{employee.nrc}</td>
        <td>{employee.gender}</td>
        <td>{employee.maritalStatus}</td>
        <td style={{ minWidth: "150px" }}>{employee.phone}</td>
        <td>{employee.address}</td>
        <td>{employee.education}</td>
        <td>{employee.workExp}</td>
        <td>{employee.joinDate}</td>
        <td>{employee.resignDate}</td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => handleEdit(employee.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(employee.id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>

        </div>
      ) : (
        <div className="card p-4 mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h3>{editingEmployee ? "Edit Employee" : "Register New Employee"}</h3>
          <form onSubmit={editingEmployee ? handleUpdate : handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={
                  editingEmployee ? editingEmployee.name : newEmployee.name
                }
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={
                  editingEmployee ? editingEmployee.email : newEmployee.email
                }
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <select
                id="position"
                name="position"
                value={
                  editingEmployee
                    ? editingEmployee.position
                    : newEmployee.position
                }
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>
                  Select Position
                </option>
                {positions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Fields */}
            <div className="mb-3">
              <label htmlFor="empid" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                id="empid"
                name="empid"
                placeholder="Enter employee ID"
                value={editingEmployee ? editingEmployee.empid : newEmployee.empid}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={editingEmployee ? editingEmployee.dob : newEmployee.dob}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nrc" className="form-label">
                NRC
              </label>
              <input
                type="text"
                id="nrc"
                name="nrc"
                placeholder="Enter NRC"
                value={editingEmployee ? editingEmployee.nrc : newEmployee.nrc}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={editingEmployee ? editingEmployee.gender : newEmployee.gender}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="maritalStatus" className="form-label">
                Marital Status
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={editingEmployee ? editingEmployee.maritalStatus : newEmployee.maritalStatus}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={editingEmployee ? editingEmployee.phone : newEmployee.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter address"
                value={editingEmployee ? editingEmployee.address : newEmployee.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="education" className="form-label">
                Education
              </label>
              <input
                type="text"
                id="education"
                name="education"
                placeholder="Enter education"
                value={editingEmployee ? editingEmployee.education : newEmployee.education}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="workExp" className="form-label">
                Work Experience
              </label>
              <input
                type="text"
                id="workExp"
                name="workExp"
                placeholder="Enter work experience"
                value={editingEmployee ? editingEmployee.workExp : newEmployee.workExp}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="joinDate" className="form-label">
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={editingEmployee ? editingEmployee.joinDate : newEmployee.joinDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="resignDate" className="form-label">
                Resign Date
              </label>
              <input
                type="date"
                id="resignDate"
                name="resignDate"
                value={editingEmployee ? editingEmployee.resignDate : newEmployee.resignDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary me-3">
              {editingEmployee ? "Update" : "Register"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsRegisterScreen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Employee;
