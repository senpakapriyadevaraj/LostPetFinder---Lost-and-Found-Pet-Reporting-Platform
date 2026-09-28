package com.PetFinder.Report.service;

import com.PetFinder.Report.entity.Report;
import com.PetFinder.Report.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Report createReport(Report report) {

        if (!report.getReportType().equalsIgnoreCase("LOST")
                && !report.getReportType().equalsIgnoreCase("FOUND")) {

            throw new RuntimeException(
                    "Report type must be LOST or FOUND"
            );
        }

        report.setStatus("ACTIVE");

        return reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Report> searchByLocation(String location) {
        return reportRepository.findByLocationIgnoreCase(location);
    }

    public Report getReportById(Long id) {
        return reportRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Report not found with id: " + id));
    }

    public Report resolveReport(Long id) {

        Report report = getReportById(id);

        report.setStatus("RESOLVED");
        return reportRepository.save(report);
    }
    public List<Report> getReportsByUser(Long userId) {
        return reportRepository.findByUserUserId(userId);
    }

    public List<Report> findMatches(Long lostReportId) {

        Report lostReport = getReportById(lostReportId);

        if (!lostReport.getReportType().equalsIgnoreCase("LOST")) {
            throw new RuntimeException(
                    "Matches can only be searched for a LOST report"
            );
        }

        if (!lostReport.getStatus().equalsIgnoreCase("ACTIVE")) {
            throw new RuntimeException(
                    "Resolved report cannot have active matches"
            );
        }

        return reportRepository
                .findByReportTypeAndStatusAndAnimalSpeciesAndAnimalColourAndLocationIgnoreCase(
                        "FOUND",
                        "ACTIVE",
                        lostReport.getAnimal().getSpecies(),
                        lostReport.getAnimal().getColour(),
                        lostReport.getLocation()
                );
    }
}
