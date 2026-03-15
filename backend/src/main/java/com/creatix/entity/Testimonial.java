package com.creatix.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
@Data
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    private String company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String review;

    @Column(nullable = false)
    private Integer rating = 5;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
