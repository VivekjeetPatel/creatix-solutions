package com.creatix;

import com.creatix.entity.User;
import com.creatix.entity.User.Role;
import com.creatix.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CreatixApplication {
    public static void main(String[] args) {
        SpringApplication.run(CreatixApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@creatix.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@creatix.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setRole(Role.SUPER_ADMIN);
                userRepository.save(admin);
            } else {
                User admin = userRepository.findByEmail("admin@creatix.com").get();
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                userRepository.save(admin);
            }
        };
    }
}
