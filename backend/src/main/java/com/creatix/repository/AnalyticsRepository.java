package com.creatix.repository;

import com.creatix.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    long countByPage(String page);

    @Query("SELECT a.page, COUNT(a) FROM Analytics a GROUP BY a.page ORDER BY COUNT(a) DESC")
    List<Object[]> findPageViewCounts();

    @Query("SELECT a.country, COUNT(a) FROM Analytics a WHERE a.country IS NOT NULL GROUP BY a.country ORDER BY COUNT(a) DESC")
    List<Object[]> findVisitorCountries();
}
