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
import backend.service.MetricService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/metrics")
public class MetricController {

    
    private final MetricService metricService;

    public MetricController(MetricService metricService) {
        this.metricService = metricService;
        
    }

    @PostMapping
    public Metric createMetric(@Valid @RequestBody Metric metric){

        OffsetDateTime now = OffsetDateTime.now();
        metric.setTimestamp(now);
        metric.setLastSeen(now);
        return metricService.SaveMetric(metric);
    }

    @GetMapping
    public List<Metric> getMetrics(){
        return metricService.getLatestMetrics();
    }

    @GetMapping("/latest")
    public List<Metric> getLatestMetrics(){
        return metricService.getLatestMetrics();
    }

    @GetMapping("/history/{agentId}")
    public List<Metric> getHistory(
        @PathVariable String agentId
    ){
        return metricService.getHistory(agentId);
    }
   
    

}
