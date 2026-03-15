package com.creatix.repository;

import com.creatix.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByIsActiveTrueOrderByDisplayOrderAsc();
    Optional<Service> findBySlug(String slug);
}
