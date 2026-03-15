package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.Testimonial;
import com.creatix.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestimonialController {

    @Autowired private TestimonialRepository testimonialRepo;

    // Public: get featured testimonials
    @GetMapping("/public/testimonials")
    public ResponseEntity<?> getPublicTestimonials() {
        List<Testimonial> list = testimonialRepo.findByIsFeaturedTrueOrderByDisplayOrderAsc();
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", list));
    }

    // Admin: get all
    @GetMapping("/admin/testimonials")
    public ResponseEntity<?> getAllTestimonials() {
        List<Testimonial> list = testimonialRepo.findAllByOrderByDisplayOrderAsc();
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", list));
    }

    // Admin: create
    @PostMapping("/admin/testimonials")
    public ResponseEntity<?> createTestimonial(@RequestBody Testimonial testimonial) {
        testimonial.setId(null);
        Testimonial saved = testimonialRepo.save(testimonial);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Created", saved));
    }

    // Admin: update
    @PutMapping("/admin/testimonials/{id}")
    public ResponseEntity<?> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial updated) {
        return testimonialRepo.findById(id).map(t -> {
            updated.setId(id);
            return ResponseEntity.ok(new Dtos.ApiResponse(true, "Updated", testimonialRepo.save(updated)));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Admin: delete
    @DeleteMapping("/admin/testimonials/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable Long id) {
        testimonialRepo.deleteById(id);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Deleted"));
    }
}
