package ems.com.ems_project.repository;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentsRepository extends JpaRepository<Departments, Integer> {
    Optional<Departments> findById(Integer Id);
}

