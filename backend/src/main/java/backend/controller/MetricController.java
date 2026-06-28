package backend.controller;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Agent;
import backend.model.Metric;
import backend.repository.AgentRepository;
import backend.service.MetricService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/metrics")
public class MetricController {

    
    private final AgentRepository agentRepository;
    private final MetricService metricService;

    public MetricController(MetricService metricService, AgentRepository agentRepository) {
        this.metricService = metricService;
        this.agentRepository = agentRepository;
        
    }

 @PostMapping
public Metric createMetric(@Valid @RequestBody Metric metric){


    OffsetDateTime now = OffsetDateTime.now();


    Agent agent = agentRepository
            .findByAgentId(metric.getAgent().getAgentId())
            .orElseGet(() -> {

                Agent newAgent = new Agent();

                newAgent.setAgentId(
                    metric.getAgent().getAgentId()
                );

                newAgent.setDeviceName(
                    metric.getDeviceName()
                );

                newAgent.setStatus("ONLINE");

                return agentRepository.save(newAgent);

            });
    agent.setLastSeen(now);

    metric.setAgent(agent);


    metric.setTimestamp(now);
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
