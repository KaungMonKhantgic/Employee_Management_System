package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee_leave")
@Data
public class EmployeeLeave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "annual_leave", nullable = false)
    private Double annualLeave = 0.0;

    @Column(name = "casual_leave", nullable = false)
    private Double casualLeave = 0.0;

    @Column(name = "medical_leave", nullable = false)
    private Double medicalLeave = 0.0;

    @Column(name = "total", nullable = false)
    private Double total = 0.0;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

    public void calculateTotalLeave() {
        this.total = annualLeave + casualLeave + medicalLeave;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getAnnualLeave() {
        return annualLeave;
    }

    public void setAnnualLeave(Double annualLeave) {
        this.annualLeave = annualLeave;
    }

    public Double getCasualLeave() {
        return casualLeave;
    }

    public void setCasualLeave(Double casualLeave) {
        this.casualLeave = casualLeave;
    }

    public Double getMedicalLeave() {
        return medicalLeave;
    }

    public void setMedicalLeave(Double medicalLeave) {
        this.medicalLeave = medicalLeave;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
