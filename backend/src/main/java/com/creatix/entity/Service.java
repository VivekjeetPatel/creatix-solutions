package com.creatix.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "services")
@Data
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(name = "short_desc")
    private String shortDesc;

    @Column(name = "full_desc", columnDefinition = "TEXT")
    private String fullDesc;

    private String icon;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
