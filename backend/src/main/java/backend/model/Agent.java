package backend.model;


import java.time.OffsetDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Agent {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true, nullable = false)
    private String agentId;


    private String deviceName;


    private String status;


    private OffsetDateTime lastSeen;



    @OneToMany(mappedBy = "agent")
    @JsonIgnore
    private List<Metric> metrics;


    public List<Metric> getMetrics(){
        return metrics;
    }


    public void setMetrics(List<Metric> metrics){
        this.metrics = metrics;
    }


    public Long getId(){
        return id;
    }


    public String getAgentId(){
        return agentId;
    }


    public void setAgentId(String agentId){
        this.agentId = agentId;
    }


    public String getDeviceName(){
        return deviceName;
    }


    public void setDeviceName(String deviceName){
        this.deviceName=deviceName;
    }


    public String getStatus(){
        return status;
    }


    public void setStatus(String status){
        this.status=status;
    }


    public OffsetDateTime getLastSeen(){
        return lastSeen;
    }


    public void setLastSeen(OffsetDateTime lastSeen){
        this.lastSeen=lastSeen;
    }

}