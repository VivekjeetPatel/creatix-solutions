package com.creatix.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio")
@Data
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "client_name")
    private String clientName;

    private String technologies;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "project_url")
    private String projectUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Category { WEB, GRAPHIC_DESIGN, BRANDING, SOFTWARE, SHOPIFY, WORDPRESS }
}
