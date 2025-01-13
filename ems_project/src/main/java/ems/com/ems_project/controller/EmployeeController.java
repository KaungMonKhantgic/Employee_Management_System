package ems.com.ems_project.controller;

import ems.com.ems_project.dto.LoginResponse;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.service.EmployeeService;
import lombok.val;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Get all employees
    @GetMapping("/all/employee")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Integer employeeId) {
        Optional<Employee> employee = employeeService.getEmployeeById(employeeId);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        } else {
            return ResponseEntity.status(404).body("Employee not found with ID: " + employeeId);
        }
    }


    // Add an employee
    @PostMapping("/add")
    public ResponseEntity<?> addEmployee(@val @RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeService.addEmployee(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding employee: " + e.getMessage());
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            // Get the username (email) of the currently authenticated user
            String loggedInUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            // Fetch the employee details based on the logged-in user's email
            ReqRes reqRes = employeeService.getProfile(loggedInUserEmail);

            if (reqRes.getStatusCode() == 200) {
                return ResponseEntity.ok(reqRes);
            } else {
                return ResponseEntity.status(reqRes.getStatusCode()).body(reqRes.getMessage());
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching the profile: " + e.getMessage());
        }
    }
}

   
