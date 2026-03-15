package com.creatix.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${admin.email:admin@creatix.com}")
    private String adminEmail;

    public void sendContactNotification(String name, String email, String service, String message) {
        if (mailSender == null) return;
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(adminEmail);
            msg.setSubject("New Contact Request – " + service);
            msg.setText("Name: " + name + "\nEmail: " + email + "\nService: " + service + "\n\nMessage:\n" + message);
            mailSender.send(msg);
        } catch (Exception ignored) {}
    }

    public void sendBookingNotification(String name, String email, String date, String time, String desc) {
        if (mailSender == null) return;
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(adminEmail);
            msg.setSubject("New Call Booking – " + name);
            msg.setText("Name: " + name + "\nEmail: " + email + "\nDate: " + date + "\nTime: " + time + "\n\nProject:\n" + desc);
            mailSender.send(msg);
        } catch (Exception ignored) {}
    }

    public void sendContactConfirmation(String toEmail, String name) {
        if (mailSender == null) return;
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(toEmail);
            msg.setSubject("We received your message – Creatix Solutions");
            msg.setText("Hi " + name + ",\n\nThank you for reaching out! Our team will get back to you within 24 hours.\n\nBest regards,\nCreatix Solutions Team");
            mailSender.send(msg);
        } catch (Exception ignored) {}
    }
}
