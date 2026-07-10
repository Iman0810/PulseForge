package backend.controller;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.config.MetricWebSocketHandler;
import backend.model.Agent;
import backend.model.Metric;
import backend.repository.AgentRepository;
import backend.service.MetricService;
import jakarta.validation.Valid;


import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/metrics")
public class MetricController {


    private final AgentRepository agentRepository;
    private final MetricService metricService;
    private final MetricWebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;
    
    


    public MetricController(
            MetricService metricService,
            AgentRepository agentRepository,
            MetricWebSocketHandler webSocketHandler,
            ObjectMapper objectMapper
    ) {

        this.metricService = metricService;
        this.agentRepository = agentRepository;
        this.webSocketHandler = webSocketHandler;
        this.objectMapper = objectMapper;

    }



@PostMapping
public Metric createMetric(
        @Valid @RequestBody Metric metric
){

    OffsetDateTime now = OffsetDateTime.now();

    if(metric.getAgent() == null ||
   metric.getAgent().getAgentId() == null){

    throw new RuntimeException(
        "Agent information missing in request"
    );

}


    // String agentId = metric.getAgent().getAgentId();

    Agent agent = agentRepository
            .findByAgentId(
                metric.getAgent().getAgentId()
            )
            .orElseGet(() -> {

                Agent newAgent = new Agent();

                newAgent.setAgentId(
                    metric.getAgent().getAgentId()
                );

                newAgent.setDeviceName(
                    metric.getDeviceName()
                );

                newAgent.setStatus("ONLINE");

                newAgent.setLastSeen(now);


                return agentRepository.save(newAgent);

            });



    agent.setStatus("ONLINE");
    agent.setLastSeen(now);

    agentRepository.save(agent);



    metric.setAgent(agent);

    metric.setTimestamp(now);

    metric.setLastSeen(now);



    Metric saved = metricService.SaveMetric(metric);

try {

    String json = objectMapper.writeValueAsString(saved);

    webSocketHandler.broadcast(json);

} catch (Exception e) {

    e.printStackTrace();

}

return saved;
}




    @GetMapping("/latest")
    public List<Metric> getLatestMetrics(){

        return metricService.getLatestMetrics();

    }




    @GetMapping("/history/{agentId}")
    public List<Metric> getHistory(
            @PathVariable String agentId
    ){

        return metricService
                .getHistory(agentId);

    }


}