package com.creatix.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics")
@Data
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String page;

    @Column(name = "visitor_ip")
    private String visitorIp;

    private String country;

    @Column(name = "user_agent")
    private String userAgent;

    private String referrer;

    private LocalDateTime timestamp = LocalDateTime.now();
}
