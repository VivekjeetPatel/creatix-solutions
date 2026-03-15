package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.ContactRequest;
import com.creatix.repository.ContactRequestRepository;
import com.creatix.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired private ContactRequestRepository contactRepo;
    @Autowired private EmailService emailService;

    @PostMapping("/contact")
    public ResponseEntity<?> submitContact(@Valid @RequestBody Dtos.ContactRequest req) {
        ContactRequest entity = new ContactRequest();
        entity.setName(req.getName());
        entity.setEmail(req.getEmail());
        entity.setPhone(req.getPhone());
        entity.setMessage(req.getMessage());
        entity.setService(req.getService());
        contactRepo.save(entity);

        emailService.sendContactNotification(req.getName(), req.getEmail(), req.getService(), req.getMessage());
        emailService.sendContactConfirmation(req.getEmail(), req.getName());

        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Message received! We'll get back to you shortly."));
    }
}
