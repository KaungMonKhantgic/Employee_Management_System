package ems.com.ems_project.service.impl;

import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ems.com.ems_project.config.PasswordEncoderConfig;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImp implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig; // Use PasswordEncoderConfig for encoding

    @Override
    public ReqRes getProfile(String email) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Employee> userOptional = employeeRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setEmployee(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("Profile retrieval successful.");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Employee not found.");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while retrieving profile: " + e.getMessage());
        }
        return reqRes;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> employee = employeeRepository.findByEmail(username);

        if (employee.isEmpty()) {
            throw new UsernameNotFoundException("Employee not found with email: " + username);
        }

        Employee emp = employee.get();

        return User.builder()
                .username(emp.getEmail())
                .password(emp.getPassword()) // Hashed password from the database
                //.roles(emp.getRole()) // Uncomment if roles are used
                .build();
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(Integer employeeId) {
        return employeeRepository.findById(employeeId);
    }

    @Override
    public ReqRes registerEmployee(Employee employee) {
        ReqRes reqRes = new ReqRes();

        // Check if an employee with the same email already exists
        Optional<Employee> existingEmployee = employeeRepository.findByEmail(employee.getEmail());
        if (existingEmployee.isPresent()) {
            reqRes.setStatusCode(409);  // Conflict
            reqRes.setMessage("Employee with this email already exists.");
            return reqRes;
        }

        try {
            // Hash the password using PasswordEncoderConfig before saving
            String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(employee.getPassword());
            employee.setPassword(hashedPassword);

            // Save the employee to the database
            Employee savedEmployee = employeeRepository.save(employee);
            reqRes.setEmployee(savedEmployee);
            reqRes.setStatusCode(201);  // Created
            reqRes.setMessage("Employee registered successfully.");
        } catch (Exception e) {
            reqRes.setStatusCode(500);  // Internal Server Error
            reqRes.setMessage("An error occurred while registering the employee: " + e.getMessage());
        }

        return reqRes;
    }
}