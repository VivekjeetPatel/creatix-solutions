package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.CallBooking;
import com.creatix.repository.CallBookingRepository;
import com.creatix.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api")
public class BookCallController {

    @Autowired private CallBookingRepository bookingRepo;
    @Autowired private EmailService emailService;

    @PostMapping("/book-call")
    public ResponseEntity<?> bookCall(@Valid @RequestBody Dtos.BookCallRequest req) {
        CallBooking entity = new CallBooking();
        entity.setName(req.getName());
        entity.setEmail(req.getEmail());
        entity.setPreferredDate(LocalDate.parse(req.getPreferredDate()));
        entity.setPreferredTime(LocalTime.parse(req.getPreferredTime()));
        entity.setProjectDescription(req.getProjectDescription());
        bookingRepo.save(entity);

        emailService.sendBookingNotification(req.getName(), req.getEmail(),
                req.getPreferredDate(), req.getPreferredTime(), req.getProjectDescription());

        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Booking received! We'll confirm your call shortly."));
    }
}
