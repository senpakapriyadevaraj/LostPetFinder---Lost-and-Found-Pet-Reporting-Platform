package com.PetFinder.Report.controller;

import com.PetFinder.Report.entity.Report;
import com.PetFinder.Report.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Report createReport(@Valid @RequestBody Report report) {
        return reportService.createReport(report);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/{id}")
    public Report getReportById(@PathVariable Long id) {
        return reportService.getReportById(id);
    }

    @GetMapping("/search")
    public List<Report> searchByLocation(
            @RequestParam String location) {

        return reportService.searchByLocation(location);
    }

    @GetMapping("/{id}/matches")
    public List<Report> findMatches(@PathVariable Long id) {
        return reportService.findMatches(id);
    }

    @PutMapping("/{id}/resolve")
    public Report resolveReport(@PathVariable Long id) {
        return reportService.resolveReport(id);
    }

    @GetMapping("/user/{userId}")
    public List<Report> getReportsByUser(@PathVariable Long userId) {
        return reportService.getReportsByUser(userId);
    }
}