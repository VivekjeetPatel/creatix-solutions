package com.creatix.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

public class Dtos {

    @Data
    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Data
    public static class LoginResponse {
        private String token;
        private String email;
        private String role;

        public LoginResponse(String token, String email, String role) {
            this.token = token;
            this.email = email;
            this.role = role;
        }
    }

    @Data
    public static class ContactRequest {
        @NotBlank @Size(max = 100)
        private String name;
        @NotBlank @Email
        private String email;
        private String phone;
        @NotBlank
        private String message;
        private String service;
    }

    @Data
    public static class BookCallRequest {
        @NotBlank @Size(max = 100)
        private String name;
        @NotBlank @Email
        private String email;
        @NotBlank
        private String preferredDate;
        @NotBlank
        private String preferredTime;
        private String projectDescription;
    }

    @Data
    public static class DashboardStats {
        private long totalVisitors;
        private long totalContacts;
        private long totalBookings;
        private long newContacts;
        private long pendingBookings;
        private java.util.List<Object[]> pageViews;
        private java.util.List<Object[]> visitorCountries;
    }

    @Data
    public static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public ApiResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}
