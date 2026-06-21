package backend.controller;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Metric;
import backend.repository.MetricRepository;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/metrics")
public class MetricController {

    private final MetricRepository metricRepository;

    public MetricController(MetricRepository metricRepository) {
        this.metricRepository = metricRepository;
    }

    @PostMapping
    public Metric createMetric(@Valid @RequestBody Metric metric){

        OffsetDateTime now = OffsetDateTime.now();
        metric.setTimestamp(now);
        metric.setLastSeen(now);
        return metricRepository.save(metric);
    }

    @GetMapping
    public List<Metric> getMetrics(){
        return metricRepository.findAll();
    }

    @GetMapping("/latest")
    public List<Metric> getLatestMetrics(){
        return metricRepository.findLatestMetrics();
    }

    @GetMapping("/history/{agentId}")
    public List<Metric> getHistory(
        @PathVariable String agentId
    ){
        return metricRepository.findByAgentIdOrderByTimestampAsc(agentId);
    }
   
    

}
