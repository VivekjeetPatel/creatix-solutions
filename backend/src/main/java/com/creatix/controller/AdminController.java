package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.ContactRequest;
import com.creatix.entity.CallBooking;
import com.creatix.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private ContactRequestRepository contactRepo;
    @Autowired private CallBookingRepository bookingRepo;
    @Autowired private AnalyticsRepository analyticsRepo;

    // Dashboard Stats
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {
        Dtos.DashboardStats stats = new Dtos.DashboardStats();
        stats.setTotalVisitors(analyticsRepo.count());
        stats.setTotalContacts(contactRepo.count());
        stats.setTotalBookings(bookingRepo.count());
        stats.setNewContacts(contactRepo.countByStatus(ContactRequest.Status.NEW));
        stats.setPendingBookings(bookingRepo.countByStatus(CallBooking.Status.PENDING));
        stats.setPageViews(analyticsRepo.findPageViewCounts());
        stats.setVisitorCountries(analyticsRepo.findVisitorCountries());
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", stats));
    }

    // Contact Messages
    @GetMapping("/messages")
    public ResponseEntity<?> getMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ContactRequest> results = contactRepo.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", results));
    }

    @PutMapping("/messages/{id}/status")
    public ResponseEntity<?> updateMessageStatus(@PathVariable Long id, @RequestParam String status) {
        return contactRepo.findById(id).map(req -> {
            req.setStatus(ContactRequest.Status.valueOf(status.toUpperCase()));
            contactRepo.save(req);
            return ResponseEntity.ok(new Dtos.ApiResponse(true, "Status updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Bookings
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<CallBooking> results = bookingRepo.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", results));
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        return bookingRepo.findById(id).map(b -> {
            b.setStatus(CallBooking.Status.valueOf(status.toUpperCase()));
            bookingRepo.save(b);
            return ResponseEntity.ok(new Dtos.ApiResponse(true, "Status updated"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
