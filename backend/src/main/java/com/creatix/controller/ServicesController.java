package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.Service;
import com.creatix.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
public class ServicesController {

    @Autowired private ServiceRepository serviceRepo;

    @GetMapping("/public/services")
    public ResponseEntity<?> getPublicServices() {
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK",
                serviceRepo.findByIsActiveTrueOrderByDisplayOrderAsc()));
    }

    @GetMapping("/admin/services")
    public ResponseEntity<?> getAllServices() {
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", serviceRepo.findAll()));
    }

    @PutMapping("/admin/services/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody Service updated) {
        return serviceRepo.findById(id).map(s -> {
            updated.setId(id);
            updated.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(new Dtos.ApiResponse(true, "Updated", serviceRepo.save(updated)));
        }).orElse(ResponseEntity.notFound().build());
    }
}
