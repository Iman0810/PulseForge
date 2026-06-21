package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import backend.model.Metric;

public interface MetricRepository extends JpaRepository<Metric , Long> {

@Query("""
SELECT m
FROM Metric m
WHERE m.timestamp =
(
    SELECT MAX(m2.timestamp)
    FROM Metric m2
    WHERE m2.agentId = m.agentId
)
""")
List<Metric> findLatestMetrics();
    
List<Metric> findByAgentIdOrderByTimestampAsc(String agentId);
}
