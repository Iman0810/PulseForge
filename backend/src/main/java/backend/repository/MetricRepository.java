package backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import backend.model.Metric;

public interface MetricRepository extends JpaRepository<Metric , Long> {

@Query("""
SELECT m FROM Metric m
WHERE m.timestamp =
(
 SELECT MAX(m2.timestamp)
 FROM Metric m2
 WHERE m2.agent.agentId = m.agent.agentId
)
""")
List<Metric> findLatestMetrics();

List<Metric> findByAgent_AgentIdOrderByTimestampDesc(String agentId,
    Pageable pageable);


}