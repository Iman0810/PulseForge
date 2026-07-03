package backend.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import backend.model.Metric;
import backend.repository.MetricRepository;

@Service
public class MetricService {

    private final MetricRepository metricRepository;
    private static final int HISTORY_LIMIT = 100;

    public MetricService(MetricRepository metricRepository){
        this.metricRepository = metricRepository;
    }

    public Metric SaveMetric(Metric metric){
        return metricRepository.save(metric);
    }

    public List<Metric> getLatestMetrics(){
        return metricRepository.findLatestMetrics();
    }
    public List<Metric> getHistory(String agentId){
        return metricRepository.findByAgent_AgentIdOrderByTimestampDesc(agentId,
            PageRequest.of(0, HISTORY_LIMIT)
        );
    }
}
