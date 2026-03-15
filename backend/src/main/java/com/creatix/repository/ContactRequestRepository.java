package com.creatix.repository;

import com.creatix.entity.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactRequestRepository extends JpaRepository<ContactRequest, Long> {
    Page<ContactRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(ContactRequest.Status status);
}
