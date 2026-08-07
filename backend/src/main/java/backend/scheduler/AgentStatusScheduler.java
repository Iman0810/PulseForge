package backend.scheduler;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import backend.model.Agent;
import backend.repository.AgentRepository;

@Component
public class AgentStatusScheduler {

    private final AgentRepository agentRepository;

    public AgentStatusScheduler(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
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

            // Only save if the status actually changed
            if (!newStatus.equals(agent.getStatus())) {

                agent.setStatus(newStatus);

                agentRepository.save(agent);

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