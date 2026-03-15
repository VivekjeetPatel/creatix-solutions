package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.Portfolio;
import com.creatix.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    @Autowired private PortfolioRepository portfolioRepo;

    // Public: all portfolio items (optionally filter by category)
    @GetMapping("/public/portfolio")
    public ResponseEntity<?> getPublicPortfolio(@RequestParam(required = false) String category) {
        List<Portfolio> list;
        if (category != null && !category.isBlank()) {
            list = portfolioRepo.findByCategoryOrderByDisplayOrderAsc(Portfolio.Category.valueOf(category.toUpperCase()));
        } else {
            list = portfolioRepo.findAllByOrderByDisplayOrderAsc();
        }
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", list));
    }

    // Admin: get all
    @GetMapping("/admin/portfolio")
    public ResponseEntity<?> getAllPortfolio() {
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", portfolioRepo.findAllByOrderByDisplayOrderAsc()));
    }

    // Admin: create
    @PostMapping("/admin/portfolio")
    public ResponseEntity<?> createPortfolio(@RequestBody Portfolio portfolio) {
        portfolio.setId(null);
        Portfolio saved = portfolioRepo.save(portfolio);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Created", saved));
    }

    // Admin: update
    @PutMapping("/admin/portfolio/{id}")
    public ResponseEntity<?> updatePortfolio(@PathVariable Long id, @RequestBody Portfolio updated) {
        return portfolioRepo.findById(id).map(p -> {
            updated.setId(id);
            return ResponseEntity.ok(new Dtos.ApiResponse(true, "Updated", portfolioRepo.save(updated)));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Admin: delete
    @DeleteMapping("/admin/portfolio/{id}")
    public ResponseEntity<?> deletePortfolio(@PathVariable Long id) {
        portfolioRepo.deleteById(id);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Deleted"));
    }
}
