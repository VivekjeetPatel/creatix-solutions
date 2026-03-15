package com.creatix.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_requests")
@Data
public class ContactRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    private String service;

    @Enumerated(EnumType.STRING)
    private Status status = Status.NEW;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status { NEW, READ, REPLIED }
}
