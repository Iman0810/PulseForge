package backend.model;



import jakarta.persistence.GenerationType;
import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
public class Metric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;
    private double cpuUsage;
    private double ramUsage;
    private double diskUsage;
    private LocalDateTime timestamp;


    public Long getId(){
        return id;
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
