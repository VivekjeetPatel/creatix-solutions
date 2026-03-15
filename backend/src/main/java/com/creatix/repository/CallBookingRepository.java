package com.creatix.repository;

import com.creatix.entity.CallBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CallBookingRepository extends JpaRepository<CallBooking, Long> {
    Page<CallBooking> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(CallBooking.Status status);
}
