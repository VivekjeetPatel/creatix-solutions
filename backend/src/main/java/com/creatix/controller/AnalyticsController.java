package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.Analytics;
import com.creatix.repository.AnalyticsRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AnalyticsController {

    @Autowired private AnalyticsRepository analyticsRepo;

    @PostMapping("/analytics/track")
    public ResponseEntity<?> trackVisit(@RequestBody Map<String, String> body, HttpServletRequest request) {
        Analytics record = new Analytics();
        record.setPage(body.getOrDefault("page", "/"));
        record.setVisitorIp(getClientIp(request));
        record.setCountry(body.get("country"));
        record.setUserAgent(request.getHeader("User-Agent"));
        record.setReferrer(request.getHeader("Referer"));
        analyticsRepo.save(record);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Tracked"));
    }

    @GetMapping("/admin/analytics")
    public ResponseEntity<?> getAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalVisitors", analyticsRepo.count());
        data.put("pageViews", analyticsRepo.findPageViewCounts());
        data.put("visitorCountries", analyticsRepo.findVisitorCountries());
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", data));
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        return (ip != null && !ip.isBlank()) ? ip.split(",")[0].trim() : request.getRemoteAddr();
    }
}
