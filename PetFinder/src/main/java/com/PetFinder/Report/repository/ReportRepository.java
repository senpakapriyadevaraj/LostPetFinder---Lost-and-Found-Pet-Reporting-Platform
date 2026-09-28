package com.PetFinder.Report.repository;

import com.PetFinder.Report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByLocationIgnoreCase(String location);

    List<Report> findByUserUserId(Long userId);

    List<Report> findByReportTypeAndStatusAndAnimalSpeciesAndAnimalColourAndLocationIgnoreCase(
            String reportType,
            String status,
            String species,
            String colour,
            String location
    );
}
