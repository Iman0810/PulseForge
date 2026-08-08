package backend.scheduler;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import backend.config.MetricWebSocketHandler;
import backend.model.Agent;
import backend.model.Metric;
import backend.repository.AgentRepository;
import backend.repository.MetricRepository;

@Component
public class AgentStatusScheduler {

    private final AgentRepository agentRepository;
    private final MetricRepository metricRepository;
    private final MetricWebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;

    public AgentStatusScheduler(
            AgentRepository agentRepository,
            MetricRepository metricRepository,
            MetricWebSocketHandler webSocketHandler,
            ObjectMapper objectMapper
    ) {
        this.agentRepository = agentRepository;
        this.metricRepository = metricRepository;
        this.webSocketHandler = webSocketHandler;
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedRate = 10000)
    public void updateAgentStatus() {

        List<Agent> agents = agentRepository.findAll();

        OffsetDateTime now = OffsetDateTime.now();

        for (Agent agent : agents) {

            String newStatus;

            if (agent.getLastSeen() == null) {

                newStatus = "OFFLINE";

            } else {

                long seconds = ChronoUnit.SECONDS.between(
                        agent.getLastSeen(),
                        now
                );

                newStatus = seconds > 30
                        ? "OFFLINE"
                        : "ONLINE";
            }

            // Only update when the status actually changes
            if (!newStatus.equals(agent.getStatus())) {

                agent.setStatus(newStatus);

                agentRepository.save(agent);

                // Get the latest metric for this agent
                List<Metric> latestMetrics =
                        metricRepository.findByAgent_AgentIdOrderByTimestampDesc(
                                agent.getAgentId(),
                                PageRequest.of(0, 1)
                        );

                if (!latestMetrics.isEmpty()) {

                    Metric latestMetric = latestMetrics.get(0);

                    try {

                        String json =
                                objectMapper.writeValueAsString(latestMetric);

                        webSocketHandler.broadcast(json);

                    } catch (Exception e) {

                        e.printStackTrace();
                    }
                }

                System.out.println(
                        "Agent " +
                        agent.getAgentId() +
                        " changed to " +
                        newStatus
                );
            }
        }
    }
}