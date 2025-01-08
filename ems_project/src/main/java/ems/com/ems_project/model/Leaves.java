package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "leaves")
@Data
public class Leaves {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private Integer leaveId;

    @Column(name = "employee_id", nullable = false)
    private Integer employeeId;

    @Column(name = "leave_type", nullable = false)
    private String leaveType;

    @Column(name = "half_leave")
    private Boolean halfLeave;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "reason")
    private String reason;

    @Column(name = "manager_id")
    private Integer managerId;

    @Column(name = "is_approved")
    private Boolean isApproved;
    
}

