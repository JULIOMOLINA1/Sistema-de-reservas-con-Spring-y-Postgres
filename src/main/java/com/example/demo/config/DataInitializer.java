package com.example.demo.config;

import com.example.demo.admin.entity.AdminEntity;
import com.example.demo.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.default-password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        if(adminRepository.findByUsername("admin").isEmpty()){
            AdminEntity admin = new AdminEntity();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setEmail("admin@restauranteelrey.com");
            admin.setFullName("Initial administrador");
            admin.setIsActive(true);
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());

            adminRepository.save(admin);
            log.info("User 'admin' created successfully with configured password.");
        } else {
            log.info("The admin user already exists. Skipping creation.");
        }
    }
}
