package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.model.Metric;
import backend.repository.MetricRepository;

@Service
public class MetricService {

    private final MetricRepository metricRepository;

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
        return metricRepository.findByAgentIdOrderByTimestampAsc(agentId);
    }
}
