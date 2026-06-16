package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Metric;

public interface MetricRepository extends JpaRepository<Metric , Long> {
    
}
