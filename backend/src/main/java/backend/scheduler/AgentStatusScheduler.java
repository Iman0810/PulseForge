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

            if (agent.getLastSeen() == null) {
                agent.setStatus("OFFLINE");
            } else {

                long seconds = ChronoUnit.SECONDS.between(
                        agent.getLastSeen(),
                        now
                );

                if (seconds > 30) {
                    agent.setStatus("OFFLINE");
                } else {
                    agent.setStatus("ONLINE");
                }
            }

            agentRepository.save(agent);
        }
    }
}