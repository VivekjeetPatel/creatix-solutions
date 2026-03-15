package com.creatix.repository;

import com.creatix.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findAllByOrderByDisplayOrderAsc();
    List<Testimonial> findByIsFeaturedTrueOrderByDisplayOrderAsc();
}
