package backend.model;



import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Metric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String agentId;

    @NotBlank(message ="Device name is required")
    private String deviceName;

    @Min(value = 0, message = "CPU usage must be a positive value")
    @Max(value = 100, message = "CPU usage must be between 0 and 100")
    private double cpuUsage;
    @Min(value = 0, message = "RAM usage must be a positive value")
    @Max(value = 100, message = "RAM usage must be between 0 and 100")
    private double ramUsage;
    @Min(value = 0, message = "Disk usage must be a positive value")
    @Max(value = 100, message = "Disk usage must be between 0 and 100")
    private double diskUsage;
    private LocalDateTime timestamp;


    public Long getId(){
        return id;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId){
        this.agentId = agentId;
    }

    public String getDeviceName() {
        return deviceName;
    }


    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }


    public double getCpuUsage() {
        return cpuUsage;
    }


    public void setCpuUsage(double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }


    public double getRamUsage() {
        return ramUsage;
    }


    public void setRamUsage(double ramUsage) {
        this.ramUsage = ramUsage;
    }


    public double getDiskUsage() {
        return diskUsage;
    }


    public void setDiskUsage(double diskUsage) {
        this.diskUsage = diskUsage;
    }


    public LocalDateTime getTimestamp() {
        return timestamp;
    }


    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }



}
